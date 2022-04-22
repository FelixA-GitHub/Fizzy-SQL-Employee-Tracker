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
const userQuestions = [
    {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['Add Department', 
                  'Add Role', 
                  'Add Employee', 
                  'Update Employee Role', 
                  'Update Employee Managers', 
                  'View Employees By Manager', 
                  'View Employees By Department', 
                  'Delete Department', 
                  'Delete Role', 
                  'Delete Employee', 
                  'View Department Budget']
    },
    {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of this Department?',
        when: ({ prompt }) => prompt === 'Add Department'
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of this Role?',
        when: ({ prompt }) => prompt === 'Add Role'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the Salary of this Role?',
        when: ({ prompt }) => prompt === 'Add Role'
    },
    {
        type: 'input',
        name: 'roleDept',
        message: 'What is the Department of this Role?',
        when: ({ prompt }) => prompt === 'Add Role'
    },
    {
        type: 'input',
        name: 'empFirstName',
        message: 'What is the First Name of this Employee?',
        when: ({ prompt }) => prompt === 'Add Employee'
    },
    {
        type: 'input',
        name: 'empLastName',
        message: 'What is the Last Name of this Employee?',
        when: ({ prompt }) => prompt === 'Add Employee'
    },
    {
        type: 'input',
        name: 'empRole',
        message: 'What is the Role of this Employee?',
        when: ({ prompt }) => prompt === 'Add Employee'
    },
    {
        type: 'input',
        name: 'empManager',
        message: 'Who is the Manager for this Employee?',
        when: ({ prompt }) => prompt === 'Add Employee'
    },
    {//need to generate a list of employees to select from and update the selected employee's role
        type: 'input',
        name: 'updateRole',
        message: 'Please select an Employee.',
        when: ({ prompt }) => prompt === 'Update Employee Role'
    }
]






