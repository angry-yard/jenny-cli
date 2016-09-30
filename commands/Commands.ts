import * as commander from "commander";
import {ICommanderProperties} from "./interfaces/ICommanderProperties";

export class Commands {
    constructor() {
        commander
            .option("--project [value]", "Add project")
            .option("--database [value]", "Add database")
            .option("--templates [value]", "Add templates", this.createList)
            .option("--tables [value]", "Add tables", this.createList)
            .parse(process.argv);

        var properties : ICommanderProperties = commander;

        this.action = properties.args[0];
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