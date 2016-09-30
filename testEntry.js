"use strict";
var _ = require("underscore");
var databaseService;
var configFile = require("./jenny.config.json");
_.each(configFile.databases, function (database) {
    var service = require("./database/" + database.databaseProvider + "/DatabaseService");
    databaseService = new service.DatabaseService(database);
});
//# sourceMappingURL=testEntry.js.map