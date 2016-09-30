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
        commander
            .option("--project [value]", "Add project")
            .option("--database [value]", "Add database")
            .option("--templates [value]", "Add templates", this.createList)
            .option("--tables [value]", "Add tables", this.createList)
            .parse(process.argv);
        var properties = commander;
        this.action = properties.args[0];
        this.databaseName = properties.databaseName;
        this.project = properties.project;
        this.templates = properties.templates;
        this.tables = properties.tables;
    }
    return Commands;
}());
exports.Commands = Commands;
//# sourceMappingURL=Commands.js.map