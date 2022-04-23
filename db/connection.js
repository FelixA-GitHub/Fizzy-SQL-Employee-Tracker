//dependencies
const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
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
  connection.connect(err => {
        if (err) throw err;
        console.log('Database connected.');
    });

  module.exports = connection;