const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// declare empty team containers
const teamMembers = []
const idArray = []

// app launch -- start of operation
function appLaunch() {

    // renderManager -- use inquirer 
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                Message: "What is name of the manager on this team?",
                validate: answer => {

                    // check not empty 
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                Message: "What is the manager's ID number?",
                validate: answer => {

                    // check for valid characters
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {

                        // check for repeat ids
                        if (idArray.includes(answer)) {
                            return "This ID is taken. Please enter a different ID."
                        }
                        else {
                            return true;
                        }
                    }
                    return ("please enter a valid characters (1-9, A-Z)");
                }
            },
            {
                type: "input",
                name: "managerEmail",
                Message: "What is the manager's email address?",
                validate: answer => {

                    // check if it is a valid email address
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return ("Please enter a valid email address.");
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                Message: "Please provide the manager's office number.",
                validate: answer => {

                    // check for valid characters
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );

                    if (pass) {
                        return true;
                    }
                    return "Please insert a valid number.";
                }

            },


        ]).then(data => {

            // construct Manager object
            const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber)

            // output data
            teamMembers.push(manager);
            idArray.push(data.managerId);
            createTeam();
        });
    }

    // createTeam -- use inquirer 
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "roleTypes",
                message: "Which type of team member would you like to add to your team?",
                choices: ["Engineer", "Intern", "My team is full"]
            },

            // then call function according to choice of role
        ]).then(roleChoice => {
            switch (roleChoice.roleTypes) {
                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                default:
                    renderTeam();
            }
        });

    }

    // renderEngineer -- use inquirer 
    function addEngineer() {
        // prompt questions 
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                Message: "What is the name of the engineer joining your team?",
                validate: answer => {

                    // check not empty 
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                Message: "What is the ID of the engineer you are adding?",
                validate: answer => {

                    // check for valid characters
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {

                        // check for repeat ids
                        if (idArray.includes(answer)) {
                            return "This ID is taken. Please enter a different ID."
                        }
                        else {
                            return true;
                        }
                    }
                    return ("please enter a valid characters (1-9, A-Z)");
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                Message: "What is the engineer's email address?",
                validate: answer => {

                    // check if it is a valid email address
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return ("Please enter a valid email address.");
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                Message: "Please provide the engineer's username.",
                validate: answer => {

                    // check not empty 
                    if (answer !== "") {
                        return true;
                    }
                    return "Please insert a valid username.";
                }
            },



        ]).then(data => {

            // construct Engineer object
            const engineer = new Engineer(data.engineerName, data.engineerId,  data.engineerEmail, data.engineerGithub)

            // output data
            teamMembers.push(engineer);
            idArray.push(data.engineerId)

            createTeam();
        })


    }

    // renderIntern -- use inquirer 
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                Message: "What is the name of the intern joining your team?",
                validate: answer => {

                    // check not empty 
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "internId",
                Message: "What is the ID of the intern you are adding?",
                validate: answer => {

                    // check for valid characters
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {

                        // check for repeat ids
                        if (idArray.includes(answer)) {
                            return "This ID is taken. Please enter a different ID."
                        }
                        else {
                            return true;
                        }
                    }
                    return ("please enter a valid characters (1-9, A-Z)");
                }
            },
            {
                type: "input",
                name: "internEmail",
                Message: "What is the intern's email address?",
                validate: answer => {

                    // check if it is a valid email address
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return ("Please enter a valid email address.");
                }
            },
            {
                type: "input",
                name: "internSchool",
                Message: "Please provide the intern's school name.",
                validate: answer => {

                    // check not empty 
                    if (answer !== "") {
                        return true;
                    }
                    return "Please insert valid characters.";
                }
            },

        ]).then(data => {
            // construct intern object
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);

            // output data
            teamMembers.push(intern);
            idArray.push(data.internId);
            createTeam();
        })

    }

    // renderTeam -- write file and output to HTML
    function renderTeam() {

        // make folder if doesn't exist yet
        if (!fs.existsSync(OUTPUT_DIR)) { fs.mkdirSync(OUTPUT_DIR) }

        // output text to path
        fs.writeFileSync(outputPath, render(teamMembers), "utf8");
    }

    // function call to start prompt process
    createManager();
}
// function call
appLaunch();