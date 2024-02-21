const getLearnerData = (courseInfo, assignmentGroup, learnerSubmission) => {
    try {
        validateCourse(courseInfo, assignmentGroup);

        const learnerData = {};
        learnerSubmission.forEach(submission => {
    
            const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);

            if (!assignment) {
                console.error(`Invalid submission: Assignment ${submission.assignment_id} not found.`);
                return;
            }

            const dueDate = new Date(assignment.due_at);
            const submissionDate = new Date(submission.submission.submitted_at);

            if (submissionDate > dueDate) {
            // Deduc 10% of total points for late submission
                submission.submission.score *= 0.9;
            }

            const percentageScore = submission.submission.score / assignment.points_possible;

            // Only include if assignment is due
            if (submissionDate <= dueDate) {
                if (!learnerData[submission.learner_id]) {
                    learnerData[submission.learner_id] = {};
                }
                learnerData[submission.learner_id][submission.assignment_id] = percentageScore;
            }
        });

        const result = [];

        for (const learnerId in learnerData) {
            const scores = learnerData[learnerId];
            const avg = calculateWeightedAverage(scores,assignmentGroup);
            const learnerResult = {
                id: parseInt(learnerId),
                avg: avg
            };

            for (const assignmentId in scores) {
                learnerResult[assignmentId] = scores[assignmentId];
            }
            result.push(learnerResult);
        }

        return result;
    } 
    catch (error) {
        console.error('An error occurred:', error.message);
        return null;
    }
}
// Helper function to validate course
const  validateCourse = (courseInfo, assignmentGroup) => {
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error("Invalid input: AssignmentGroup does not belong to the provided course.");
    }
}

// Helper function to calculate weighted average
function calculateWeightedAverage(scores, ag) {
    let totalScore = 0;
    let totalWeight = 0;
    for (const assignmentId in scores) {
      const assignmentWeight = ag.assignments.find(a => a.id === parseInt(assignmentId)).points_possible;
      totalScore += scores[assignmentId] * assignmentWeight;
      totalWeight += assignmentWeight;
    }
    return totalScore / totalWeight;
  }

module.exports = {
    getLearnerData,
    validateCourse
};








