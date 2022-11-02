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
        choices: ['Departments','Roles','Emplyees','add a department', 'add a role', 'add an employee', 'update an employee role','quit']
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

//add deparment
//inquirer prompt above add deperment
//query will be insert into


questions();