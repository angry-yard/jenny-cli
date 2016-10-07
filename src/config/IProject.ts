import {IProjectDatabase} from "./IProjectDatabase";

export interface IProject {
    name: string;
    databases: IProjectDatabase[];
}