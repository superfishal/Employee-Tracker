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
    .then((newDepartment) => {
      db.addDepartment(newDepartment)
        .then(() =>
          console.log(
            `${newDepartment.name} department has been added to the Database`
          )
        )
        .then(() => inquirerPrompts());
    });
};
const addRole = () => {
  db.fin;
  inquirer
    .prompt([
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
    ])
    .then((newRole) => {
      db.addRole(newRole)
        .then(() => console.log(`${newRole.title} role has been added!`))
        .then(() => inquirerPrompts());
    });
};
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the new employee's FIRST name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the new employee's LAST name?",
      },
    ])
    .then((answers) => {
      let firstName = answers.firstName;
      let lastName = answers.lastName;
      db.findAllRoles().then(([roles]) => {
        const roleArray = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt({
            type: "list",
            name: "roleId",
            message: "What is the new employees role?",
            choices: roleArray,
          })
          .then((newEmployeeRole) => {
            db.findAllEmployees()
              .then(([employees]) => {
                const managerArray = employees.map(
                  ({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                  })
                );

                managerArray.unshift({ name: "None", value: null });

                inquirer.prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager for this Employee?",
                    choices: managerArray,
                  },
                ]);
              })
              .then((newEmployeeManager) => {
                let employee = {
                  manager_id: newEmployeeManager.manager,
                  role_id: newEmployeeRole.roleId,
                  first_name: firstName,
                  last_name: lastName,
                };
                db.addEmployee(employee)
                  .then(() =>
                    console.log(
                      `${firstName} ${lastName} added to the database successfully!`
                    )
                  )
                  .then(() => inquirerPrompts());
              });
          });
      });
    });
};
const updateEmployee = () => {};

const quitProgram = () => {
  console.log("Database Updated. Goodbye!");
  process.exit();
};
inquirerPrompts();
