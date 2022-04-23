const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "DB_USER",
  database: "DB_NAME",
});
