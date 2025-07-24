// Import exported functions from `fruit.js` so we can use them here.
import { initArray, iterate, Direction } from "./frugt.js";

// Import exported functions from `person.js` so we can use them there.
import { Person, Employee } from "./person.js";

// Main function to provide function to run in entry point of application.
function main() {
    // Initialise Array of fruit elements.
    let frugter = initArray("Æble", "Banan", "Kirsebær", "Mango", "Appelsin", "Ananas", 1);

    iterate(frugter, Direction.ASCENDING, "Mango");
    // Output:
    // Item Æble at index 0 is not a Mango. Keep searching.
    // Item Banan at index 1 is not a Mango. Keep searching.
    // Item Kirsebær at index 2 is not a Mango. Keep searching.
    // Found Mango at index 3
    // Item Appelsin at index 4 is not a Mango. Keep searching.
    // Item Ananas at index 5 is not a Mango. Keep searching.
    // Both checkFruit [1] and correctFruit [Mango] need to be strings.
    
    iterate(frugter, Direction.DESCENDING, "Æble");
    // Output:
    // Both checkFruit [1] and correctFruit [Æble] need to be strings.
    // Item Ananas at index 5 is not a Æble. Keep searching.
    // Item Appelsin at index 4 is not a Æble. Keep searching.
    // Item Mango at index 3 is not a Æble. Keep searching.
    // Item Kirsebær at index 2 is not a Æble. Keep searching.
    // Item Banan at index 1 is not a Æble. Keep searching.
    // Found Æble at index 0
    
    iterate(frugter, Direction.HOVSA, "Ananas");
    // Output:
    // Error {Error} e: Direction undefined is not valid.
    try {
        let jens = new Person(/*name*/"Jens", /*age*/67, /*city*/"Herlev");
        let jane = new Employee(/*name*/"Jane", /*age*/30, /*city*/"Odsherred", /*salary*/600000, /*company*/"Bjarke Ingels Group", /*position*/"Arkitekt", /*isEmployed*/true);
        let elon = new Employee(/*name*/"Elon", /*age*/54, /*city*/"Austin", /*salary*/490000000000, /*company*/"Tesla", /*position*/"CEO", /*isEmployed*/true);

        jens.introduce();
        jane.introduce();
        elon.introduce();

        jens.getAge();
        jens.incrementAge();

        jane.getAge();
        jane.incrementAge();
        jane.promote(1000000, "Bjarke Ingels Group", "Chefarkitekt");

        elon.incrementAge();
        elon.fire();
        elon.introduce();

        elon.fire();

        jens = new Employee(jens.name, jens.age, jens.city);
        jens.hire(350000, "Netto", "Kasseekspedient");
        jens.incrementSalary(50000);

        jens.introduce();
    } catch (e) {
        console.error(e.message);
    }
}

// Entry point of application from anonymous function.
(function() {
    main();
}());
