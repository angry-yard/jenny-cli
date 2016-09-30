import * as commander from "commander";

export interface ICommanderProperties extends commander.IExportedCommand {
    databaseName?: string;
    templates?: string[];
    tables?: string[];
    project?: string;
}