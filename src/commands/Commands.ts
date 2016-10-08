import * as commander from "commander";
import {ICommanderProperties} from "./interfaces/ICommanderProperties";

export class Commands {
    constructor() {
        // Add help menu
        commander.on("--help", () => {
            console.log("Need to add custom help");
        });

        var properties: ICommanderProperties = commander.parse(process.argv);
        var action = properties.args[0];

        switch (action) {
            case "data-generate":
                // This action is used for generating data
                commander
                    .option("--database [value]", "Add database")
                    .option("--out [value]", "Name of file to create")
                    .option("--tables [value]", "Add tables", this.createList);

                properties = commander;

                break;
            case "data-export":
                // This action is used for export data from the database
                commander
                    .option("--export", "Export data")
                    .option("--database [value]", "Add database")
                    .option("--template [value]", "Add template")
                    .option("--out [value]", "Name of file to create")
                    .option("--tables [value]", "Add tables", this.createList);

                properties = commander;

                break;
            case "database-add":
                // This action is used for creating a new database to the config file
                commander
                    .option("--user [value]", "Add project")
                    .option("--password [value]", "Add password")
                    .option("--server [value]", "Add server")
                    .option("--database [value]", "Add database");

                properties = commander;

                break;
            case "database-delete":
                // This action is used for deleting database from the config file
                commander
                    .option("--database [value]", "Add database");

                properties = commander;

                break;
            case "database-refresh":
                // This action is used for refreshing the tables for a database in the config file
                commander
                    .option("--database [value]", "Add database");

                properties = commander;

                break;
            case "generate":
                // This action is used for code generation
                commander
                    .option("--project [value]", "Add project")
                    .option("--templates [value]", "Add templates", this.createList);

                properties = commander;

                break;
            case "snippet":
                // This action is used for code snippet generation
                commander
                    .option("--file [value]", "File name")
                    .option("--save", "Save file");

                properties = commander;

                break;
            case "sync":
                // This action is used for syncing databases with scripts
                commander
                    .option("--project [value]", "Add project")
                    .option("--database [value]", "Add database")
                    .option("--templates [value]", "Add templates", this.createList)
                    .option("--tables [value]", "Add tables", this.createList);

                properties = commander;

                break;
            case "template":
                // This action is used for searching for templates online
                commander
                    .option("--project [value]", "Add project")
                    .option("--database [value]", "Add database")
                    .option("--templates [value]", "Add templates", this.createList)
                    .option("--tables [value]", "Add tables", this.createList);

                properties = commander;

                break;
            case "init":
                // This is the catch all for actions that do not have options

                break;
            default:
                console.log(`${action} is not a valid action`);
                process.exit();
        }

        this.action = action;
        this.databaseName = properties.databaseName;
        this.project = properties.project;
        this.templates = properties.templates;
        this.tables = properties.tables;
    }

    action: string;
    databaseName: string;
    tables: string[];
    templates: string[];
    project: string;

    private createList = (item: string): string[] => {
        if (item) {
            return item.split(",");
        }

        return null;
    };
}