import {IConnectionInformation} from "./IConnectionInformation";
import {ITableConfig} from "./ITableConfig";

export interface IDatabase {
    name: string;
    databaseProvider: string;
    connectionInformation: IConnectionInformation;
    tablesConfig: ITableConfig
}