;const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
},
console.log(`Connected to the employee_db database.`)
);


const questions = () => {
    inquirer.prompt({
        type: "list",
        name: "optionList",
        message: "Choose one of the following Options",
        choices: ['Departments','Roles','Employees','add a department', 'add a role', 'add an employee', 'update an employee role','quit']
    })
    .then((answer)=>{
        switch(answer.optionList){
            case "Departments": 
                viewAllDepartments();
                break;
            case "Roles":
                viewAllRoles();
                break;
            case "Employees":
                viewAllEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmployee();
                break;
            case 'quit':
                process.exit(1);
        }
    });

}


const viewAllDepartments = () =>{
    //getting all information from the department table
    db.query('select * from department', (err, result)=>{
        if(err){
            console.log('error');
            return;
        }
        console.table(result);
        questions();
    });
}

const viewAllRoles = () =>{
    //getting all information from the department table
    db.query('select * from role', (err, result)=>{
        if(err){
            console.log('error');
            return;
        }
        console.table(result);
        questions();
    });
}

const viewAllEmployees = () =>{
    //getting all information from the department table
    db.query('select * from employee', (err, result)=>{
        if(err){
            console.log('error');
            return;
        }
        console.table(result);
        questions();
    });
}

const addDepartment = () => {

        inquirer.prompt({
            type: "input",
            name: "addDepartment",
            message: "Enter the name of the department"
        })
        .then((answers)=>{
            db.query(`INSERT INTO department (name) VALUES (?)`, answers.addDepartment, (err, result)=>{
                if(err){
                    console.log('error');
                    return;
                }
                questions();
            });
        })
}

const addRole = () => {
    inquirer.prompt({
        type: "input",
        name: "addRole",
        message: "Enter the title of the Role"
    })
    .then((answers)=>{
        db.query(`INSERT INTO role (title) VALUES (?)`, answers.addRole, (err, result)=>{
            if(err){
                console.log('error');
                return;
            }
            questions();
        });
    })
}

const addEmployee = () => {
    inquirer.prompt({
        type: "input",
        name: "addFirst",
        message: "Enter the first name of the Employee"
    },
    {
        type: "input",
        name: "addLast",
        message:"Enter the last name of the Employee"
    })
    .then((answers)=>{
        db.query(`INSERT INTO employee (first_name) VALUES (?)`, answers.addFirst, (err, result)=>{
            if(err){
                console.log('error');
                return;
            }            
        })
        db.query(`INSERT INTO employee (last_name) VALUES (?)`, answers.addLast, (err, result)=>{
            if(err){
                console.log('error');
                return;
            }
        })
        questions();
    })

}

const updateEmployee = () => {

    db.query('select * from employee', (err, result)=>{
        if(err){
            console.log('error');
            return;
        }
        const employeeArr = result.map(employee => {
            return {name: `${employee.first_name} ${employee.last_name}`, value:employee.id} ;
        });
        db.query('select * from role', (err, result)=>{
            if(err){
                console.log('error');
                return;
            }
            const roleArr = result.map(role => {
                return {name:role.title, value:role.id} ;
            });

        inquirer.prompt([{
            type: "list",
            name: "employeeList",
            message: "Select the name of the employee",
            choices: employeeArr
        },
        {
            type: "list",
            name: "roleList",
            message: "Select the name of the role",
            choices: roleArr
        }])
        .then((answers)=>{
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answers.roleList,answers.employeeList], (err, result) => {
                console.log("update complete");
                questions();
            });
        });
        });

    });
}

questions();