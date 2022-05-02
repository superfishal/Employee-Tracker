const connection = require("./connection.js");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name AS department FROM department;"
      );
  }
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title AS role, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  }
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, CONCAT(employee.first_name,' ', employee.last_name) AS employee, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id"
      );
  }
  addDepartment(newDepartment) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", newDepartment);
  }
}

module.exports = new DB(connection);
