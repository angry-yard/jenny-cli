import {IForeignKeyColumn} from "./interfaces/IForeignKeyColumn";
import {IColumn} from "./interfaces/IColumn";
import {Column} from "./Column";

export class ForeignKeyColumn implements IForeignKeyColumn {
    constructor(column: Column, foreignKeyColumns: Array<IColumn>) {
        this.column = column;
    }

    column: Column;
}
