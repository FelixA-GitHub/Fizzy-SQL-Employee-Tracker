//dependencies
const db = require('./db');
const { prompt } = require('inquirer');
require('console.table');

// Start server after DB connection
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
// });

//userQuestions
function userQuestions() {
    prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'Welcome! What would you like to do?',
            choices: [
                {
                    name: 'View Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                // {
                //     value: new inquirer.Separator()
                // },
                // {
                //     name: 'Update Employee Manager',
                //     value: 'UPDATE_EMPLOYEE_MANAGER'
                // },
                // {
                //     name: 'View Employees By Manager',
                //     value: 'VIEW_EMPLOYEES_BY_MANAGER'
                // },
                // {
                //     name: 'View Employees By Department',
                //     value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                // },
                // {
                //     name: 'Delete Department',
                //     value: 'REMOVE_DEPARTMENT'
                // },
                // {
                //     name: 'Delete Role',
                //     value: 'REMOVE_ROLE'
                // },
                // {
                //     name: 'Delete Employee',
                //     value: 'REMOVE_EMPLOYEE'
                // },
                // {
                //     name: 'View Department Budget',
                //     value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT'
                // },
                {
                    name: 'Quit',
                    value: 'QUIT'
                }
            ]
        }
    ]).then((userAnswers) => {
        var choice = userAnswers.prompt;
        switch (choice) {
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            default: 
                quit();
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
            // case 'VIEW_DEPARTMENTS':
            //     viewDepartments();
            //     break;
        }
    })
}

function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            console.table(rows);
        })
        .then(() => userQuestions())
}

function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            console.table(rows);
        })
        .then(() => userQuestions())
}

function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            console.table(rows);
        })
        .then(() => userQuestions())
}

function addDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(result => {
        let name = result;
        db.createDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database!`))
            .then(() => userQuestions())
    })
}

//run
function init() {
            userQuestions();
        }

// function call to initialize app
init();





