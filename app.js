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
            message: "What is their name?",
            name: "name"
        }, 
        {
            message: "What is their email?",
            name: "email"
        },
        {
            message: "What is their id？",
            name: "id"
        },
        {
            message: "What is their office number?",
            name: "officeNumber"
        }
    ],
    "Engineer":[
        {
            message: "What is their name?",
            name: "name"
        }, 
        {
            message: "What is their email?",
            name: "email"
        },
        {
            message: "What is their id？",
            name: "id"
        },
        {
            message: "What is their github?",
            name: "github"
        }
    ],
    "Intern":[
        {
            message: "What is their name?",
            name: "name"
        }, 
        {
            message: "What is their email?",
            name: "email"
        },
        {
            message: "What is their id？",
            name: "id"
        },
        {
            message: "What is their school?",
            name: "school"
        }
    ]
}

function init(){
    inquirer.prompt({
        message: "Hello who would you like to add to the team?",
        type: "list",
        choices: ["Manager", "Engineer", "Intern", "I'm done, create my team."],
        name: "job"
    }).then(({job})=> {
        if(job === "I'm done, create my team.") {
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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
