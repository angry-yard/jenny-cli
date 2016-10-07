import {ITable} from "./ITable";

export interface IProjectTable extends ITable {
    include: string[],
    includeAll: boolean;
    exclude: string[];
}