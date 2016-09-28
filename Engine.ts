///<reference path="typings/index.d.ts"/>

import * as _ from "underscore";
import {IConfigFile} from "./config/IConfigFile";
import {IDatabaseService} from "./database/common/interfaces/IDatabaseService";
import {IGenerator} from "./generators/interfaces/IGenerator";
import {IDatabase} from "./config/IDatabase";
import {Table} from "./database/common/Table";

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
        let generator = require(`./generators/${this.configFile.templateEngine}/Generator`);
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

                var lastTable = _.last(tables);

                _.each(tables, (table: Table) => {
                    this.jenny
                        .processTemplate(table, this.configFile)
                        .then((table: Table) => {
                            if (lastTable.id === table.id) {
                                console.log("Finished");
                                process.exit();
                            }
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
}