"use strict";
var Engine_1 = require("./Engine");
var Commands_1 = require("./commands/Commands");
var engine = new Engine_1.Engine();
var commands = new Commands_1.Commands();
switch (commands.action) {
    case "generate":
        engine.processTemplates(commands.databaseName, commands.templates, commands.tables);
        break;
    case "help":
        console.log("Help is under construction");
        break;
    default:
        console.log("Action - " + commands.action + ", was not found");
        break;
}
//# sourceMappingURL=jenny.js.map