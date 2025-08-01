// Enum-like constant to select function depending on given direction.
const Direction = Object.freeze({
    ASCENDING: "ascending".toUpperCase(),
    DESCENDING: "descending".toUpperCase()
})

/**
 * Lambda iterate over array elements chronologically
 * @param {Array} arr: Array containing fruits
 * @param {string} correctFruit: Fruit to evaluate against.
 *
 * ```js
 * // The following expression...
 * arr.forEach((item, index) => {...})
 *
 * // ... is equivalent to the following expression
 * arr.forEach(function(item, index) {...})
 * ```
 */
function iterateAscending(arr, correctFruit) {
    arr.forEach((item, index) => {
        isFruitCorrect(item, correctFruit, index);
    });
}

/**
 * Lambda iterate over array elements reverse-chronological
 * @param {Array} arr: Array containing fruits
 * @param {string} correctFruit: Fruit to evaluate against.
 */
function iterateDescending(arr, correctFruit) {
    for (let i = arr.length-1; i >= 0; i--) {
        isFruitCorrect(arr[i], correctFruit, i);
    }
}

/**
 * Compare ${checkFruit} with ${correctFruit} and log output.
 * @param {string} checkFruit: The item to evaluate.
 * @param {string} correctFruit: The item to evaluate ${checkFruit} against.
 * @param {number} index: The index of the current iterator.
 *
 * @throws {Error} if either ${checkFruit} or ${correctFruit} are not string data type.
 */
function isFruitCorrect(checkFruit, correctFruit, index) {
    try { // try-catch loop, in case you need that.

        // this statement checks if either `checkFruit` or `correctFruit` are not `string` data type.
        // throws error, if they are not.
        if (typeof checkFruit !== "string" || typeof correctFruit !== "string")
            throw new Error(`Both checkFruit [${checkFruit}] and correctFruit [${correctFruit}] need to be strings.`)

        if (checkFruit === correctFruit) {
            console.log(`Found ${checkFruit} at index ${index}`);
            console.log()
        } else {
            console.log(`Item ${checkFruit} at index ${index} is not a ${correctFruit}. Keep searching.`)
            console.log();
        }
    } catch (e) { // error from above is 'caught' as variable `e` and error message is printed.
        console.error(e.message);
        console.log();
    }
}

/**
 * Utility function to initialise an Array.
 * @returns {Array}.
 */
function initArray() {
    return Array.prototype.slice.call(arguments);
}

async function promptFruitArray() {
    let arr = await input({
        name: "Add items to array separated by comma.",
    });
}

/**
 * Function to iterate over elements of Array ${arr}
 * @param {Array} arr: Array containing elements to iterate.
 * @param {Object} direction: Enum-like direction variable determining direction of iteration.
 * @param {string} correctFruit: The item to evalute against.
 * @throws {Error} if ${direction} is not present in {Object} Direction.
 */
function iterate(arr, direction, correctFruit) {
    try {
        switch (direction) {
            case Direction.ASCENDING: 
                iterateAscending(arr, correctFruit=correctFruit);
                break; // `break` keyword breaks out of the current loop, as opposed to `continue`, which continues next iteration.
            case Direction.DESCENDING:
                iterateDescending(arr, correctFruit=correctFruit);
                break;
            default:
                throw new Error(`Direction ${direction} is not valid.`)
                break;
        }
    } catch (e) {
        console.error(e.message) // notice `console.error()` instead of `console.log()` when logging errors.
        console.log();
    }
}

const frugt = { initArray, iterate, Direction };

export default frugt;
