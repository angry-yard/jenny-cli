import * as _ from "underscore";
import {IConfigFile} from "./config/IConfigFile";
import {IDatabaseService, Table} from "jenny-database";
import {IGenerator} from "./generators/interfaces/IGenerator";
import {IDatabase} from "./config/IDatabase";

export class Engine {
    private configFile: IConfigFile;
    private databaseService: IDatabaseService;
    private jenny: IGenerator;

    constructor() {
        // Load configuration file
        this.configFile = require("./jenny.config.json");

        // Iterate through each database in the config and create a service and generator for  it
        _.each(this.configFile.databases, (database: IDatabase) => {
            // Load database service based on setting
            let service = require(`./database/${database.databaseProvider}/DatabaseService`);
            this.databaseService = new service.DatabaseService(database);
        });

        // Load generator based on setting
        let generator = require(this.configFile.templateEngine);
        this.jenny = new generator.Generator(this.configFile);
    }

    processTemplates = (databaseName: string, templates: string[], tables: string[]): void => {
        this.databaseService
            .populateTables()
            .then((tables: Array<Table>) => {
                if (tables.length === 0) {
                    console.log("No tables to process");
                    process.exit();
                }

                this.jenny.processTemplates(tables);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
}