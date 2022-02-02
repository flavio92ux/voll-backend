const mysql = require('mysql2');
require('dotenv').config();

console.log(process.env.MYSQL_HOST, process.env.MYSQL_PASSWORD, process.env.MYSQL_USER, process.env.MYSQL_PORT);
 
const pool = mysql.createPool({
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT
  });
 
pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE}`, function (err, result) {
    if (err) throw err;
    console.log(`${process.env.MYSQL_DATABASE} database created`);
  })

pool.query(`CREATE TABLE IF NOT EXISTS ${process.env.MYSQL_DATABASE}.${process.env.MYSQL_TABLE} (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, message VARCHAR(255), moment VARCHAR(255), nick VARCHAR(255))`, function (err, result) {
  if (err) throw err;
  console.log(`${process.env.MYSQL_TABLE} table created`);
  process.exit();
})
