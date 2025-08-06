import { init } from './cli.js';

// Main function to provide function to run in entry point of application.
async function main() {
    init();
}

// Entry point of application from anonymous function.
(async function() {
    main();
}());
