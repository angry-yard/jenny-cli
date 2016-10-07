"use strict";
var _ = require("underscore");
var Engine = (function () {
    function Engine() {
        var _this = this;
        this.processTemplates = function (databaseName, templates, tables) {
            _this.databaseService
                .populateTables()
                .then(function (tables) {
                if (tables.length === 0) {
                    console.log("No tables to process");
                    process.exit();
                }
                _this.jenny.processTemplates(tables);
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        this.configFile = require("./jenny.config.json");
        _.each(this.configFile.databases, function (database) {
            var service = require("./database/" + database.databaseProvider + "/DatabaseService");
            _this.databaseService = new service.DatabaseService(database);
        });
        var generator = require(this.configFile.templateEngine);
        this.jenny = new generator.Generator(this.configFile);
    }
    return Engine;
}());
exports.Engine = Engine;
//# sourceMappingURL=Engine.js.map