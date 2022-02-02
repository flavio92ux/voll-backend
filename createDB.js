const mysql = require('mysql2');
require('dotenv').config();
 
const  pool = mysql.createPool({
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT
  });
 
pool.query("CREATE DATABASE IF NOT EXISTS ExampleDB", function (err, result) {
    if (err) throw err;
    console.log("ExampleDB database created");
  })

pool.query("CREATE TABLE IF NOT EXISTS ExampleDB.webchat2 (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, message VARCHAR(255), moment VARCHAR(255), nick VARCHAR(255))", function (err, result) {
  if (err) throw err;
  console.log("webchat table created");
  process.exit();
})
