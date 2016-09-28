import {IColumn} from "./IColumn";
import {IForeignKeyColumn} from "./IForeignKeyColumn";

export interface IPrimaryKeyColumn {
    column: IColumn;
    foreignKeyColumns: Array<IForeignKeyColumn>;
}