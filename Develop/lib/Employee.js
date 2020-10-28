class Employee {

    // constructor function with fields (name, id, email)
    constructor (name, id, email) {
        // name
        this.name = name;
        // id
        this.id = id;
        // email
        this.email = email;
    }

    // prototype methods
    getName() { 
        return this.name;
    }
    
    getId() { 
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }

}
  

// export 
module.exports = Employee;
