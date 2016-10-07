import * as commander from "commander";

export interface ICommanderProperties extends commander.ICommand {
    databaseName?: string;
    templates?: string[];
    tables?: string[];
    project?: string;
}