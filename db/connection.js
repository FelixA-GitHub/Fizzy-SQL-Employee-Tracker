//dependencies
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password}
      password: 'root',
      //database name
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );

  db.connect(function (err) {
      if(err) throw err;
  });

  module.exports = db;