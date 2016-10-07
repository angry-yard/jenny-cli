import {IDatabase} from "./IDatabase";
import {IProjectTable} from "./IProjectTable";

export interface IProjectDatabase extends IDatabase {
    tables: IProjectTable[];
    include: string[],
    includeAll: boolean;
    exclude: string[];
}