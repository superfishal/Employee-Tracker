const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username, pass, and DB from .env file
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the Employee database!")
);
module.exports = db;
