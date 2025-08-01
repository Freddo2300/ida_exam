import frugt from './src/frugt.js';
import person from './src/person.js';
import fodbold from './src/fodbold.js';

import figlet from 'figlet';
import chalk from 'chalk';

import { input, select } from '@inquirer/prompts';

const ScriptType = Object.freeze({
    FRUIT: 1,
    PERSON: 2,
    FOOTBALL: 3
});

export async function init() {
    try {
        console.log(
            await figlet.text("ida_exam", {
                horizontalLayout: "full",
                verticalLayout: "default",
                width: 100
            })
        );
    } catch (e) {
        console.error(e.error);
    }

    let choice = await select({
        message: "Which script would you like to run?",
        choices: [
            { name: "Script 1: fruit", value: ScriptType.FRUIT },
            { name: "Script 2: person", value: ScriptType.PERSON },
            { name: "Script 3: football", value: ScriptType.FOOTBALL },
            { name: chalk.red("Exit this program."), value: ScriptType.EXIT }
        ]
    });

    switch (choice)
    {
        case ScriptType.FRUIT: {
            executeFruitScript();
            break;
        }
        case ScriptType.PERSON: {
            executePersonScript();
            break;
        }
        case ScriptType.FOOTBALL: {
            executeFootballScript();
            break;
        }
        default:
            process.exit();
    }
}

async function executeFruitScript() {
    // Initialise Array of fruit elements.
    let frugter = frugt.initArray("Æble", "Pære", "Banan", "Kiwi", true, "Mango", 1);

    frugt.iterate(frugter, frugt.Direction.ASCENDING, "Mango");
    // Output:
    // Item Æble at index 0 is not a Mango. Keep searching.
    // Item Banan at index 1 is not a Mango. Keep searching.
    // Item Kirsebær at index 2 is not a Mango. Keep searching.
    // Found Mango at index 3
    // Item Appelsin at index 4 is not a Mango. Keep searching.
    // Item Ananas at index 5 is not a Mango. Keep searching.
    // Both checkFruit [1] and correctFruit [Mango] need to be strings.
    
    frugt.iterate(frugter, frugt.Direction.DESCENDING, "Æble");
    // Output:
    // Both checkFruit [1] and correctFruit [Æble] need to be strings.
    // Item Ananas at index 5 is not a Æble. Keep searching.
    // Item Appelsin at index 4 is not a Æble. Keep searching.
    // Item Mango at index 3 is not a Æble. Keep searching.
    // Item Kirsebær at index 2 is not a Æble. Keep searching.
    // Item Banan at index 1 is not a Æble. Keep searching.
    // Found Æble at index 0
    
    frugt.iterate(frugter, frugt.Direction.HOVSA, "Ananas");
    // Output:
    // Error {Error} e: Direction undefined is not valid.
}

function executePersonScript() {
    let jens = new person.Person(/*name*/"Jens", /*age*/67, /*city*/"Herlev");
    let jane = new person.Employee(/*name*/"Jane", /*age*/30, /*city*/"Odsherred", /*salary*/600000, /*company*/"Bjarke Ingels Group", /*position*/"Arkitekt", /*isEmployed*/true);
    let elon = new person.Employee(/*name*/"Elon", /*age*/54, /*city*/"Austin", /*salary*/490000000000, /*company*/"Tesla", /*position*/"CEO", /*isEmployed*/true);

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

    jens = new person.Employee(jens.name, jens.age, jens.city);
    jens.hire(350000, "Netto", "Kasseekspedient");
    jens.incrementSalary(50000);

    jens.introduce();
}

async function executeFootballScript() {
    await fodbold.initScript();
}

const cli = { init };

export default cli;
