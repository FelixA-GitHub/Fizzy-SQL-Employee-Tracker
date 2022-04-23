//dependencies
const db = require('./db');
const { prompt } = require('inquirer');
const { dirSync } = require('tmp');
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

function addRole() {
    //find all departments to choose from
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoice = departments.map(({ id, name }) => (
                {
                    value: id,
                    name: name
                }
            ));
            prompt([
                {
                    name: 'title',
                    message: 'What is the title of the role you would like to add?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary for the role you would like to add?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'What is the department for the role you would like to add?',
                    choices: departmentChoice
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database!`))
                        .then(() => userQuestions())
                })
        })
}

function addEmployee() {
    //prompt for first and last name
    prompt([
        {
            name: 'first_name',
            message: 'What is the first name of the employee you would like to add?'
        },
        {
            name: 'last_name',
            message: 'What is the last name for the employee you would like to add?'
        }
    ]).then((result) => {
        //store results
        let firstName = result.first_name;
        let lastName = result.last_name;

        //make list of available roles
        db.findAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleChoice = roles.map(({ id, title }) => (
                    {
                        value: id,
                        name: title
                    }
                ));
                prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'What is the role you would like to choose?',
                        choices: roleChoice
                    }
                ]).then((result) => {
                    //store results
                    let roleId = result.role_id;

                    //find all managers from employee list
                    db.findAllEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managerChoice = employees.map(({ id, first_name, last_name }) => (
                                {
                                    value: id,
                                    name: `${first_name} ${last_name}`
                                }
                            ));
                            prompt([
                                {
                                    type: 'list',
                                    name: 'manager_id',
                                    message: 'Who is the manager you would like to choose?',
                                    choices: managerChoice
                                }
                            ]).then(result => {
                                //store results
                                let employee = {
                                    first_name: firstName,
                                    last_name: lastName,
                                    role_id: roleId,
                                    manager_id: result.managerId
                                }
                                //create employee
                                db.createEmployee(employee)
                                    .then(() => console.log(`Added ${employee.first_name} ${employee.last_name} to the database!`))
                                    .then(() => userQuestions())
                            })
                        })
                })
            })
    })
}

function updateEmployeeRole() {
    //choose from available employees
    db.findAllEmployees()
        .then(([rows]) => {
            employees = rows;
            const employeeChoice = employees.map(({ id, first_name, last_name }) => (
                {
                    value: id,
                    name: `${first_name} ${last_name}`
                }
            ));
            prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'You want to update the role of which employee?',
                    choices: employeeChoice
                }
            ]).then((result) => {
                let employeeId = result.employee_id;

                //choose from available roles
                db.findAllRoles()
                    .then(([rows]) => {
                        roles = rows;
                        const roleChoice = roles.map(({ id, title }) => (
                            {
                                value: id,
                                name: title
                            }
                        ));
                        prompt([
                            {
                                type: 'list',
                                name: 'role_id',
                                message: 'What is the new role?',
                                choices: roleChoice
                            }
                        ]).then(result => db.updateEmployeeRole(employeeId, result.roleId))
                            .then(() => console.log(`Updated ${employee.first_name} ${employee.last_name}'s role to ${employee.role_id} in the database!`))
                            .then(() => userQuestions())
                    })
            })
        })
}


//run
function init() {
    userQuestions();
}

// function call to initialize app
init();





