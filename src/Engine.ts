import * as _ from "underscore";
import * as fs from "fs";
import * as path from "path";
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
        if (fs.existsSync(process.cwd() + "/jenny.config.json")) {
            this.configFile = require(process.cwd() + "/jenny.config.json");
        } else {
            console.log("jenny.config.json cannot be found. Ensure jenny is being executed in the root of the project");
            process.exit();
        }

        // Iterate through each database in the config and create a service and generator for  it
        _.each(this.configFile.databases, (database: IDatabase) => {
            var modulePath = path.join(process.cwd(), "node_modules", database.databaseProvider);

            // Ensure module is installed
            if (fs.existsSync(modulePath)) {
                // Load database service based on setting
                let service = require(modulePath);
                this.databaseService = new service.DatabaseService(database);
            } else {
                console.log(`Database driver ${database.databaseProvider} cannot be found`);
                process.exit();
            }
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