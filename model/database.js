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
        "INSERT INTO webchat (message, moment, nick) VALUES (?,?,?)",
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
        "SELECT * from webchat order by moment asc",
        function (err, rows) {
          if (err) reject(err);
          else resolve(rows);
        }
      );

    });
  }

}

module.exports = DB;