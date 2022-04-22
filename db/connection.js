//dependencies
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      //database name
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );
  db.promise().query("SELECT 1")
    .then(([rows,fields]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then(() => db.end());  

  module.exports = db;