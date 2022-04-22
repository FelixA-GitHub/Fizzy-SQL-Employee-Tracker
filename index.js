//dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password}
      password: '',
      //port
      port: 3006,
      //database name
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );



