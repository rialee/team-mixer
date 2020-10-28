const Employee = require("./Employee");

// set up intern class blueprint -- extends Employee
class Intern extends Employee {

    // constructor function base class + school
    constructor(name, id, email, school) {
        super (name, id, email);
        this.school = school;
    };
        
    // prototype methods
    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}

// export
module.exports = Intern;