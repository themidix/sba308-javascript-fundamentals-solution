Prompt:

You are given a task to write a JavaScript program that analyzes and transforms data about learners' grades in a course. The program should take four inputs:

CourseInfo: An object containing the course ID and name.
AssignmentGroup: An object containing the assignment group ID, name, course ID (which should match the CourseInfo object's ID), and weight.
assignments: An array of objects, each containing the assignment ID, name, due date, and maximum points possible.
learnerSubmissions: An array of objects, each containing the learner ID, assignment ID, and submission information (submitted time and score).
The program should output an array of objects, each containing the following information for each learner:

ID: The learner's ID.
avg: The learner's weighted average score, considering the weight of each assignment group.
assignment scores: An object where each key is an assignment ID and the value is the learner's percentage score on that assignment (considering late penalties).
The program should handle various edge cases and errors, such as:

Mismatching course IDs between AssignmentGroup and CourseInfo.
Invalid data types (e.g., points_possible being 0).
Assignments not yet due.
Late submissions (deduct 10% of points).
Solution:

Here is a step-by-step guide on how to solve the prompt:

Define helper functions:

Write a function to validate the course ID consistency between AssignmentGroup and CourseInfo.
Write a function to calculate the weighted average score, considering assignment weights and late penalties.
Write a function to calculate the percentage score for an assignment, considering late penalties.
Create the getLearnerData function:

Take the four input parameters: CourseInfo, AssignmentGroup, assignments, and learnerSubmissions.
Validate the course ID consistency using the helper function.
Initialize an empty array to store the results.
Loop through each learnerSubmission:
Calculate the learner's average score using the helper function.
Create an object to store the learner's data (ID, avg, assignment scores).
Loop through each assignment in the assignments array:
Check if the assignment is due.
If due, calculate the learner's score for that assignment using the helper function.
Add the assignment ID and score to the learner's data object.
Push the learner's data object to the results array.
Return the results array.
Test your code:

Use the provided sample data to test your code and ensure it produces the correct output.
Create test cases for edge cases and error handling to ensure your code is robust.
Push your code to GitHub:

Create a local Git repository for your project.
Commit your code frequently with meaningful messages.
Push your repository to GitHub.
Submit your work:

Use the submission instructions provided in the prompt to submit the link to your GitHub repository.
Additional tips:

Use clear and concise variable names.
Add comments to explain your code's logic.
Use proper indentation and formatting to make your code readable.
Consider using unit tests to ensure the correctness of your code.