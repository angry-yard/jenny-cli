import {ITemplate} from "./ITemplate";
import {IDatabase} from "./IDatabase";
import {IProject} from "./IProject";

export interface IConfigFile {
    templateEngine: string;
    templates: ITemplate;
    databases: IDatabase[];
    projects: IProject[];
    globalVariables: { [key: string]: string; }
}