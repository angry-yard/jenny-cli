import {Engine} from "./Engine";
import {Commands} from "./commands/Commands";


// Create engine to run functionality
var engine = new Engine();

// Create command line interface interpreter
var commands = new Commands();

// Ensure called action is valid
switch (commands.action) {
    case "template-process":
        engine.processTemplates(commands.databaseName, commands.templates, commands.tables);

        break;
    case "help":
        console.log("Help is under construction");
        break;
    default:
        console.log(`Action - ${commands.action}, was not found`);
        break;
}