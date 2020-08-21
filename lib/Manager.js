// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require ("./Employee");

class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}


// const person = new Manager("chad", 2, "blah@gmail.com", 100);

// Manager.prototype.giveLastName = function(lastname){
//     this.lastname = lastname
// }
// const person2 = new Manager()
// console.log(person);
// person.giveLastName("Tao");
// console.log(person);
module.exports = Manager;