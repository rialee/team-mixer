const Employee = require("./Employee");

// set up manager class blueprint -- extends Employee
class Manager extends Employee{

    // constructor function base class + officeNum
    constructor (name, id, email, officeNum) {
        super (name, id, email);
        this.officeNum = officeNum;
    }

    // prototype methods
    getRole() {
        return "Manager";
    }

    getOfficeNum() {
        return this.officeNum;
    }
}

// export
module.exports = Manager;