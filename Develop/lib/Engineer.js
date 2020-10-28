const Employee = require("./Employee");

// set up engineer class blueprint -- extends Employee
class Engineer extends Employee {

    // constructor function base class + github
    constructor (name, id, email, github) {
        super (name, id, email);
        this.github = github;
    };

    // prototype methods
    getRole() {
        return "Engineer";
    }

    getGithub() {
        return this.github;
    }
}

// export
module.exports = Engineer;