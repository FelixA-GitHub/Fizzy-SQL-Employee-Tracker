INSERT INTO department 
    (name)
VALUES 
    ("Development");

INSERT INTO role 
    (title, salary, department_id) 
VALUES
    ("Developer", 100000, 1);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id) 
VALUES 
    ("Felix", "Acevedo", 1 , 1);