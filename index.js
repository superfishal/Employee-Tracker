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
        case "View all Employees":
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
const viewDepartments = () => {
  db.findAllDepartments()
    .then(([departments]) => {
      console.table(departments);
    })
    .then(() => {
      inquirerPrompts();
    });
};
const viewRoles = () => {
  db.findAllRoles()
    .then(([roles]) => {
      console.table(roles);
    })
    .then(() => {
      inquirerPrompts();
    });
};
const viewEmployees = () => {
  db.findAllEmployees()
    .then(([employees]) => {
      console.table(employees);
    })
    .then(() => {
      inquirerPrompts();
    });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's the name of the new department?",
      },
    ])
    .then((answer) => {
      db.addDepartment(answer)
        .then(() =>
          console.log(
            `${answer.name} department has been added to the Database`
          )
        )
        .then(() => inquirerPrompts());
    });
};
const addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's the name of the new role?",
    },
    { type: "number", name: "salary", message: "What's the salary?" },
    {
      type: "list",
      name: "departmentID",
      message: "Which department does this role belong to?",
      choices: [],
    },
  ]);
};
const addEmployee = () => {};
const updateEmployee = () => {};
const quitProgram = () => {
  console.log("Database Updated. Goodbye!");
  process.exit();
};
inquirerPrompts();
