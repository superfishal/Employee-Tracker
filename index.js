const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

const inquirerPrompts = () => {
  return prompt([
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
        "Update an Employee manager",
        "Update an Employees role",
        "Exit the program",
      ],
    },
  ]).then((answer) => {
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
      case "Update an Employee manager":
        updateEmployeeManager();
        break;
      case "Update an Employees role":
        updateEmployeeRole();
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
  prompt([
    {
      type: "input",
      name: "name",
      message: "What's the name of the new department?",
    },
  ]).then((newDepartment) => {
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
  db.findAllDepartments().then(([departments]) => {
    let choices = departments.map(({ id, name }) => {
      return { value: id, name };
    });
    prompt([
      {
        type: "input",
        name: "title",
        message: "What's the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "What's the department for the new role?",
        choices: choices,
      },
    ]).then((newRole) => {
      db.addRole(newRole)
        .then(() => {
          console.log(`${newRole.title} role has been added to the Database`);
        })
        .then(() => {
          inquirerPrompts();
        });
    });
  });
};
const addEmployee = () => {
  prompt([
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
  ]).then((answers) => {
    let firstName = answers.firstName;
    let lastName = answers.lastName;
    db.findAllRoles().then(([roles]) => {
      const roleArray = roles.map(({ id, role }) => ({
        name: role,
        value: id,
      }));
      prompt({
        type: "list",
        name: "roleId",
        message: "What is the new employees role?",
        choices: roleArray,
      }).then((newEmployeeRole) => {
        db.findAllEmployees().then(([employees]) => {
          const managerArray = employees.map(({ id, employee }) => ({
            name: employee,
            value: id,
          }));

          managerArray.unshift({ name: "None", value: null });

          prompt([
            {
              type: "list",
              name: "manager",
              message: "Who is the manager for this Employee?",
              choices: managerArray,
            },
          ]).then((newEmployeeManager) => {
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
  });
};
const updateEmployeeManager = () => {
  // grab all employees from database
  db.findAllEmployees().then(([employees]) => {
    const employeeArray = employees.map(({ id, employee }) => {
      return { name: employee, value: id };
    });
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to update?",
        choices: employeeArray,
      },
    ]).then(({ employeeId }) => {
      db.findAllManagers(employeeId).then(([managers]) => {
        const managerArray = managers.map(({ id, first_name, last_name }) => {
          return { name: `${first_name} ${last_name}`, value: id };
        });
        prompt([
          {
            type: "list",
            name: "managerId",
            message: "Which manager do you want to assign?",
            choices: managerArray,
          },
        ])
          .then(({ managerId }) => {
            db.updateEmployeeManager(employeeId, managerId);
          })
          .then(() => {
            console.log("Update successful");
          })
          .then(() => {
            inquirerPrompts();
          });
      });
    });
  });
};
const updateEmployeeRole = () => {
  // grab all employees from database
  db.findAllEmployees().then(([employees]) => {
    const employeeArray = employees.map(({ id, employee }) => {
      return { name: employee, value: id };
    });
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to update?",
        choices: employeeArray,
      },
    ]).then(({ employeeId }) => {
      db.findAllRoles().then(([roles]) => {
        const rolesArray = roles.map(({ id, role }) => {
          return { name: role, value: id };
        });
        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to reassign?",
            choices: rolesArray,
          },
        ])
          .then(({ roleId }) => {
            db.updateEmployeeRole(employeeId, roleId);
          })
          .then(() => {
            console.log("Update successful");
          })
          .then(() => {
            inquirerPrompts();
          });
      });
    });
  });
};
const quitProgram = () => {
  console.log("Database Updated. Goodbye!");
  process.exit();
};
inquirerPrompts();
