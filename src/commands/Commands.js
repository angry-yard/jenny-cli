"use strict";
var commander = require("commander");
var Commands = (function () {
    function Commands() {
        this.createList = function (item) {
            if (item) {
                return item.split(",");
            }
            return null;
        };
        var properties = commander.parse(process.argv);
        var action = properties.args[0];
        switch (action) {
            case "data-generate":
                commander
                    .option("--database [value]", "Add database")
                    .option("--out [value]", "Name of file to create")
                    .option("--tables [value]", "Add tables", this.createList);
                properties = commander;
                break;
            case "data-export":
                commander
                    .option("--export", "Export data")
                    .option("--database [value]", "Add database")
                    .option("--template [value]", "Add template")
                    .option("--out [value]", "Name of file to create")
                    .option("--tables [value]", "Add tables", this.createList);
                properties = commander;
                break;
            case "database-add":
                commander
                    .option("--user [value]", "Add project")
                    .option("--password [value]", "Add password")
                    .option("--server [value]", "Add server")
                    .option("--database [value]", "Add database");
                properties = commander;
                break;
            case "database-delete":
                commander
                    .option("--database [value]", "Add database");
                properties = commander;
                break;
            case "database-refresh":
                commander
                    .option("--database [value]", "Add database");
                properties = commander;
                break;
            case "generate":
                commander
                    .option("--project [value]", "Add project")
                    .option("--templates [value]", "Add templates", this.createList);
                properties = commander;
                break;
            case "snippet":
                commander
                    .option("--file [value]", "File name")
                    .option("--save", "Save file");
                properties = commander;
                break;
            case "sync":
                commander
                    .option("--project [value]", "Add project")
                    .option("--database [value]", "Add database")
                    .option("--templates [value]", "Add templates", this.createList)
                    .option("--tables [value]", "Add tables", this.createList);
                properties = commander;
                break;
            case "template":
                commander
                    .option("--project [value]", "Add project")
                    .option("--database [value]", "Add database")
                    .option("--templates [value]", "Add templates", this.createList)
                    .option("--tables [value]", "Add tables", this.createList);
                properties = commander;
                break;
            case "init":
                break;
            default:
                console.log(action + " is not a valid action");
                process.exit();
        }
        this.action = action;
        this.databaseName = properties.databaseName;
        this.project = properties.project;
        this.templates = properties.templates;
        this.tables = properties.tables;
    }
    return Commands;
}());
exports.Commands = Commands;
//# sourceMappingURL=Commands.js.map