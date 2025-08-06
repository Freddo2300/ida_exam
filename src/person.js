// notice: object-oriented programming working with classes, objects, inheritance, and polymorphism.
// purely educational, use it if you like, it shows how to deal with classes in Javascript.
// note that classes were not part of Javascript 
//
// objects can be instantiated like any variable:
// ```js
// let obj = {
//   first_name: "Michael",
//   last_name: "Jordan"
// }
// ```
//
// or with `function` like Javascript before ECMA script 6:
// ```js
// function Person(name, age, city) {
//   return {
//     name: name;
//     age: age;
//     city: city;
//   } 
// }
// ```
//
// or, after ECMA script 6, using `class`:
// ```js
// class Car() {
//   constructor(make, model, price) {
//      this.make = make;
//      this.model = model;
//      this.price = price;
//   }
// }
// ```

/**
 * @class {Object} Person: A blue-print for a person
 *
 * @property {string} name: Name of the person.
 * @property {number} age: Age of the person.
 * @property {string} city: City of the person.
 *
 * @constructor(name, age, city)
 */
class Person {
    name;
    age;
    city;

    constructor(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    
    // A class method that fetches a property is called a getter
    getName() {
        return this.name;
    }
    
    // A class method that modifies a property is called a setter
    setName(name) {
        this.name = name;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
        console.log(`${this.getName()} is now ${age} old.`)
        console.log();
    }

    incrementAge() {
        this.age++;
        console.log(`${this.getName()} is now ${this.getAge()} old. Happy birthday!`)
        console.log();
    }

    getCity() {
        return this.city;
    }

    setCity(city) {
        this.city = city;
        console.log(`${this.getName()} has moved to ${city}`)
        console.log();
    }

    introduce() {
        console.log(`Hi! My name is ${this.getName()} and I am ${this.getAge()} old and live in ${this.getCity()}.`);
        console.log();
    }
}

/**
 * @class {Object} Employee: An employee is a subclass - or a type - of a Person and inherits/extends from that class.
 *
 * @property {number} #salary: Private property of the salary of the employee person.
 * @property {string} #company: Private property of the company of the employee person.
 * @property {string} #position: Private property of the position of the employee person.
 * @property {boolean} #isEmployee: Private property is the employee currently employed.
 *
 * notice: inheritance achieved by extending from Person class.
 *
 * notice: merely here to show inheritance and polymprohism.
 */
class Employee extends Person {
    #salary; // `#` is synonymous with private, i.e. only visible within scope of class.
    #company; // all these properties are unique to `Employee` class
    #position;
    #isEmployed;

    constructor(/*required param*/name, age, city, /*optional param*/salary=10000, company=undefined, position=undefined, isEmployed=false) {
        super(name, age, city); // `super` is required for extending superclass.
        this.#salary = salary;
        this.#company = company;
        this.#position = position;
        this.#isEmployed = isEmployed;
    }

    #getSalary() {
        return this.#salary.toLocaleString();
    }

    #setSalary(salary) {
        this.#salary = salary;
    }

    incrementSalary(amount) {
        this.#salary += amount;
    }

    #getPosition() {
        // terniary expression -> condition ? true action : false action
        return this.#isEmployed ? this.#position : console.log(`${super.getName()} is unemployed at the moment.\n`);
    }

    #setPosition(position) {
        this.#position = position;
    }

    #getCompany() {
        return this.#company;
    }
    
    // private method can only be used inside of class.
    #setCompany(company) {
        this.#company = company;
    }
    
    // public method (without `#`) can be used anywhere from object.
    hire(salary, company, position) {
        this.#isEmployed = true;
        this.#setSalary(salary);
        this.#setCompany(company);
        this.#setPosition(position);

        console.log(`Congratulations ${super.getName()}! You got hired as ${position} for ${company}`)
        console.log();
    }

    promote(salary, company, position) {
        if (this.#isEmployed !== true) {
            this.hire(salary, company, position)
        }
        else {
            this.#setSalary(salary);
            this.#setCompany(company);

            let oldPosition = this.#position;
            this.#setPosition(position);

            console.log(`Congratulation ${super.getName()}! You got promoted from ${oldPosition} to ${position}.`)
            console.log();
        }
    }

    fire() {
        try {
            if (this.#isEmployed === false) {
                throw new Error(`${super.getName()} is already unemployed.`)
            }

            this.#isEmployed = false;
            this.#setSalary(0);
            this.#setCompany(undefined);
            this.#setPosition(undefined);
        
            console.log(`Sorry to see you go ${super.getName()}`)
            console.log();
        } catch (e) {
            console.error(e.message);
        }
    }

    // notice: polymorphism attained by overriding super class `introduce()` method.
    introduce() {
        if (this.#isEmployed === true) {
            console.log(`My name is ${super.getName()} I am ${super.getAge()} old and I come from ${super.getCity()}`);
            console.log();
            console.log(`I work as a ${this.#getPosition()} at ${this.#getCompany()}, where I earn ${this.#getSalary()}.`);
            console.log();
        } else {
            console.log(`My name is ${super.getName()} I am ${super.getAge()} old and I come from ${super.getCity()}`);
            console.log();
            console.log(`I am currently unemployeed. If you happen to know a vacant position, let me know!`);
            console.log();
        }
    }
}

const executeScript = async () => {
       
}

const person = { Person, Employee };

export default person;
