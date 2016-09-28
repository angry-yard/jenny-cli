import {IColumn} from "./IColumn";
import {IPrimaryKey} from "./IPrimaryKey";

export interface ITable {
    id: number;
    schema: string;
    name: string;
    primaryKey: IPrimaryKey;
    columns: Array<IColumn>;
}