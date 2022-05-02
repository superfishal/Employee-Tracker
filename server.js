const connection = require("./db/connection.js");
const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

const inquirerPrompts = () => {
  return inquirer
    .prompt([
      {
        type: "rawlist",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all Employees",
          "Add a department",
          "Add a role",
          "Add an Employee",
          "Update an Employee role",
          "Exit the program",
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answer) => {
      let choice = answer.choice;
      switch (choice) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          // job title, role id, department, and salary
          viewRoles();
          break;
        case "View all employees":
          // employee ids, first name, last name, job titles, departments, salaries, managers of the employee
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee role":
          updateEmployee();
          break;
        default:
          quitProgram();
      }
    });
};
// const viewDepartments = () => {
//   class DB {
//     // references the connection
//     constructor(connection) {
//         this.connection = connection;
//     };

//     // find all departments method
//     findAllDepartments() {
//         return this.connection.promise().query("SELECT department.id, department.name AS department FROM department;");
//     };
//   }
// db.findAllDepartments()
// // parse the query for readability
// .then(([rows]) => {
//     let departments = rows;
//     console.table(departments);
// })
// .then(() => mainPrompts());
// };
const viewRoles = () => {};
const viewEmployees = () => {};
const addDepartment = () => {};
const addRole = () => {};
const addEmployee = () => {};
const updateEmployee = () => {};
const quitProgram = () => {
  console.log("Database Updated. Goodbye!");
  process.exit();
};
inquirerPrompts();
