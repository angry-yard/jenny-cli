import {ITable} from "./ITable";

export interface ITableConfig {
    include?: string[];
    includeAll?: boolean;
    exclude?: string[];
    tables?: ITable[];
}