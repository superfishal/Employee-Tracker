DROP DATABASE IF EXISTS empoyees_db;
CREATE DATABASE empoyees_db;

USE empoyees_db;

CREATE TABLE department(
id INT PRIMARY KEY,
department_name VARCHAR(30)
);



CREATE TABLE role(
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT
)
CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
    -- null if employee has no manager!
)



-- employee

-- id: INT PRIMARY KEY

-- first_name: VARCHAR(30) to hold employee first name

-- last_name: VARCHAR(30) to hold employee last name

-- role_id: INT to hold reference to employee role

-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)