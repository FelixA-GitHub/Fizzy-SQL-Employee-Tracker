//dependencies
const connection = require('./connection');

class DB {
    constructor (connection) {
        this.connection = connection;
    }
    findAllEmployees(){
        return this.connection.promise().query('SELECT')
    }
    findAllPossibleManagers(employeeId){
        return this.connection.promise().query('SELECT', employeeId)
    }
    createEmployee(employee){
        return this.connection.promise().query('SELECT', employee)
    }
    removeEmployee(employeeId){
        return this.connection.promise().query('SELECT', employeeId)
    }
    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query('SELECT', [roleId, employeeId])
    }
    findAllRoles(){
        return this.connection.promise().query('SELECT')
    }
    createRole(role){
        return this.connection.promise().query('SELECT', role)
    }
    // removeEmployee(){
    //     return this.connection.promise().query('SELECT')
    // }
    findAllDepartments(){
        return this.connection.promise().query('SELECT department.id, department.name FROM department;');
    }
    createDepartment(department){
        return this.connection.promise().query('SELECT', department)
    }
    // removeDepartment(departmentId){
    //     return this.connection.promise().query('SELECT', departmentId)
    // }
}

module.exports = new DB (connection);