INSERT INTO department (id, name)
VALUES 
  (?,?);

INSERT INTO role (id, title, salary, department_id) 
VALUES
  (?,?,?,?);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES 
    (?,?,?,?,?);