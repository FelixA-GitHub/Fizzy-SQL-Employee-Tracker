//dependencies
const db = require('./db/connection');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

//userQuestions







