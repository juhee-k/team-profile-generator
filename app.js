const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];
const prompts = {
    "Manager": [
        {
            message: "What is your manager's name?",
            name: "name"
        }, 
        {
            message: "What is your manager's email?",
            name: "email"
        },
        {
            message: "What is your manager's id？",
            name: "id"
        },
        {
            message: "What is your manager's office number?",
            name: "officeNumber"
        }
    ],
    "Engineer":[
        {
            message: "What is your engineer's name?",
            name: "name"
        }, 
        {
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            message: "What is your engineer's id？",
            name: "id"
        },
        {
            message: "What is your engineer's GitHub username?",
            name: "github"
        }
    ],
    "Intern":[
        {
            message: "What is your intern's name?",
            name: "name"
        }, 
        {
            message: "What is your intern's email?",
            name: "email"
        },
        {
            message: "What is your intern's id？",
            name: "id"
        },
        {
            message: "What is your intern's school?",
            name: "school"
        }
    ]
}

function init(){
    inquirer.prompt({
        message: "Please build your team!",
        type: "list",
        choices: ["Manager", "Engineer", "Intern", "I don't want to add any more team members."],
        name: "job"
    }).then(({job})=> {
        if(job === "I don't want to add any more team members.") {
            //call generate team function with employees array
            console.log(employees);
            fs.writeFile(outputPath, render(employees), err=> console.log(err||"success!"))
            return
        }
        inquirer.prompt(prompts[job])
        .then(data=> {
            let emp;
           
            switch(job) {
                case "Manager":
                    emp = new Manager(data.name,data.id,data.email,data.officeNumber)
                    break;
                case "Engineer":
                    emp = new Engineer(data.name,data.id,data.email,data.github)
                    break;
                case "Intern":
                    emp = new Intern(data.name,data.id,data.email,data.school)
                    break;
            

                default:
                    break;
            }
            employees.push(emp);
            setTimeout(init, 1000)
        })
    })
}

init()
