// // Helper functions
// function validateCourseIDConsistency(course, ag) {
//     // ... implementation to check if course IDs match
//     if (ag.course_id !== course.id) {
//         throw new Error("Invalid input: AssignmentGroup does not belong to the provided course.");
//       }
//   }
  
//   function calculateWeightedAverageScore(learnerSubmissions, assignments, assignmentGroup) {
//     // ... implementation to calculate weighted average, considering weights and late penalties
//     // learnerSubmission.forEach(element => {
//     //     if(element.)
        
//     // });
//   }
  
//   function calculateAssignmentScore(submission, assignment) {
//     // ... implementation to calculate percentage score, considering late penalties
//   }
  
//   // Main function
//   function getLearnerData(courseInfo, assignmentGroup, assignments, learnerSubmissions) {
//     // Validate course ID consistency
//     validateCourseIDConsistency(courseInfo, assignmentGroup);
  
//     // Initialize results array
//     const results = [];
  
//     // Loop through each learner submission
//     for (const learnerSubmission of learnerSubmissions) {
//       // Calculate learner's average score
//       const averageScore = calculateWeightedAverageScore(
//         learnerSubmissions,
//         assignments,
//         assignmentGroup
//       );
  
//       // Create object to store learner's data
//       const learnerData = {
//         id: learnerSubmission.learner_id,
//         avg: averageScore,
//       };
  
//       // Loop through each assignment
//       for (const assignment of assignments) {
//         // Check if assignment is due
//         if (isAssignmentDue(assignment)) {
//           // Calculate learner's score for the assignment
//           const assignmentScore = calculateAssignmentScore(
//             learnerSubmission,
//             assignment
//           );
  
//           // Add assignment ID and score to learner's data object
//           learnerData[assignment.id] = assignmentScore;
//         }
//       }
  
//       // Push learner's data to results array
//       results.push(learnerData);
//     }
  
//     return results;
//   }
//   console.log(validateCourseIDConsistency(3,2))

// Helper functions 

function getLearnerData(course, ag, submissions) {
  // Validate if the AssignmentGroup belongs to the correct course
  if (ag.course_id !== course.id) {
    throw new Error("Invalid input: AssignmentGroup does not belong to the provided course.");
  }

  // Helper function to calculate weighted average
  function calculateWeightedAverage(scores) {
    let totalScore = 0;
    let totalWeight = 0;
    for (const assignmentId in scores) {
      const assignmentWeight = ag.assignments.find(a => a.id === parseInt(assignmentId)).points_possible;
      totalScore += scores[assignmentId] * assignmentWeight;
      totalWeight += assignmentWeight;
    }
    return totalScore / totalWeight;
  }

  // Process submissions
  const learnerData = {};
  submissions.forEach(submission => {
    // Find the assignment
    const assignment = ag.assignments.find(a => a.id === submission.assignment_id);
    if (!assignment) {
      console.error(`Invalid submission: Assignment ${submission.assignment_id} not found.`);
      return;
    }

    // Check if the assignment is due
    const dueDate = new Date(assignment.due_at);
    const submissionDate = new Date(submission.submission.submitted_at);
    if (submissionDate > dueDate) {
      // If late submission, deduct 10% of total points
      submission.submission.score *= 0.9;
    }

    // Calculate percentage score
    const percentageScore = submission.submission.score / assignment.points_possible;

    // Only include if assignment is due
    if (submissionDate <= dueDate) {
      if (!learnerData[submission.learner_id]) {
        learnerData[submission.learner_id] = {};
      }
      learnerData[submission.learner_id][submission.assignment_id] = percentageScore;
    }
  });

  // Calculate average and format result
  const result = [];
  for (const learnerId in learnerData) {
    const scores = learnerData[learnerId];
    const avg = calculateWeightedAverage(scores);
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

// Test data
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
