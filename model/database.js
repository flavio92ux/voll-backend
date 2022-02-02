const mysql = require("mysql2");
require('dotenv').config();

let db = null;
class DB {
  constructor() {
    db = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  storeUserMessage(data) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO ${process.env.MYSQL_TABLE} (message, moment, nick) VALUES (?,?,?)`,
        [data.message, data.moment, data.nick],
        function (err, rows) {
          if (err) reject(new Error(err));
          else resolve(rows);
        }
      );
    });
  }
  
  fetchMessages() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${process.env.MYSQL_TABLE} ORDER BY 'id' ASC`,
        function (err, rows) {
          if (err) reject(err);
          else resolve(rows);
        }
      );

    });
  }

}

module.exports = DB;