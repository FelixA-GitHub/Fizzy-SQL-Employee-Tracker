//dependencies
const connection = require('./connection');

class DB {
    constructor (connection) {
        this.connection = connection;
    }
    findAllEmployees(){
        return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee;');
    }
    findAllPossibleManagers(employeeId){
        return this.connection.promise().query('SELECT employee.first_name, employee.last_name WHERE employee != ?', employeeId);
    }
    createEmployee(employee){
        return this.connection.promise().query('INSERT INTO employee SET ?', employee);
    }
    removeEmployee(employeeId){
        return this.connection.promise().query('SELECT', employeeId);
    }
    updateEmployeeRole(employeeId, roleId){
        return this.connection.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeId, roleId]);
    }
    findAllRoles(){
        return this.connection.promise().query('SELECT role.id, role.title, role.salary, role.department_id FROM role;');
    }
    createRole(role){
        return this.connection.promise().query('INSERT INTO role SET ?', role);
    }
    // removeEmployee(){
    //     return this.connection.promise().query('SELECT')
    // }
    findAllDepartments(){
        return this.connection.promise().query('SELECT department.id, department.name FROM department;');
    }
    createDepartment(department){
        return this.connection.promise().query('INSERT INTO department SET ?;', department);
    }
    // removeDepartment(departmentId){
    //     return this.connection.promise().query('SELECT', departmentId)
    // }
}

module.exports = new DB (connection);