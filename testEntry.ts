import * as _ from "underscore";
import {IDatabase} from "./config/IDatabase";
import {IDatabaseService} from "./database/common/interfaces/IDatabaseService";

var databaseService: IDatabaseService;
var configFile = require("./jenny.config.json");

_.each(configFile.databases, (database: IDatabase) => {
    // Load database service based on setting
    let service = require(`./database/${database.databaseProvider}/DatabaseService`);
    databaseService = new service.DatabaseService(database);
});

//databaseService.createTables(null);