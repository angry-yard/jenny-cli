import {IColumn} from "./IColumn";

export interface IForeignKeyColumn {
    id: number;
    foreignColumn: IColumn;
}