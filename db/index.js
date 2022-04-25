//dependencies
const connection = require('./connection');

class DB {
    constructor (connection) {
        this.connection = connection;
    }
    findAllEmployees(){
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;');
    }
    findAllPossibleManagers(employeeId){
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name WHERE employee != ?', employeeId);
    }
    createEmployee(employee){
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }
    removeEmployee(employeeId){
        return this.connection.promise().query('SELECT', employeeId);
    }
    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query('UPDATE employee SET employee.role_id = ? WHERE id = ?', [roleId, employeeId]);
    }
    findAllRoles(){
        return this.connection.promise().query('SELECT role.title, role.id, department.name, role.salary FROM role INNER JOIN department ON role.department_id = department.id;');
    }
    createRole(role){
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }
    // removeEmployee(){
    //     return this.connection.promise().query('SELECT')
    // }
    findAllDepartments(){
        return this.connection.promise().query('SELECT department.name, department.id FROM department;');
    }
    createDepartment(department){
        return this.connection.promise().query('INSERT INTO department SET ?;', department);
    }
    // removeDepartment(departmentId){
    //     return this.connection.promise().query('SELECT', departmentId)
    // }
}

//export
module.exports = new DB (connection);