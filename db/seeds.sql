INSERT INTO department 
    (id, name)
VALUES 
    (1, "Development");

INSERT INTO role 
    (id, title, salary, department_id) 
VALUES
    (1, "Developer", 100000, 1);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id) 
VALUES 
    (1, "Felix", "Acevedo", 1 , 1);