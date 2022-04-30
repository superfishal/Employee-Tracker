const db = require("./db/connection.js");
const inquirer = require("inquirer");
require("console.table");

const inquirerPrompts = () => {
  console.log("Welcome to Employee Tracker");
  return (
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all Employees",
            "Add a department",
            "Add a role",
            "Add an Employee",
            "Update and Employee role",
            "Exit the program",
          ],
        },
      ])
      .then((answers) => {})
      // switch statement to call list choice
      .catch((error) => {
        if (error.message) {
        } else {
        }
      })
  );
};
inquirerPrompts();
// view all departments function
// add department function
// department names and ids
// view all roles function
// job title, role id, department, and salary
// add role function
// view all employees function
// employee ids, first name, last name, job titles, departments, salaries, managers of the employee
// add employee function
// update employee role function
