const mysql = require("mysql2");
let db = null;
class DB {
  constructor() {
    db = mysql.createPool({
      host: "us-cdbr-east-04.cleardb.com",
      user: "b7622c6d4e4701",
      password: "bf807c1b",
      database: "heroku_3b98d95500ebbe2",
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