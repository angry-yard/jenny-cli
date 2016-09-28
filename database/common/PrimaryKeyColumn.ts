import {IPrimaryKeyColumn} from "./interfaces/IPrimaryKeyColumn";
import {Column} from "./Column";
import {ForeignKeyColumn} from "./ForeignKeyColumn";

export class PrimaryKeyColumn implements IPrimaryKeyColumn {
    constructor(column: Column, foreignKeyColumns: Array<Column>) {
        this.column = column;
    }

    column: Column;
    foreignKeyColumns: Array<ForeignKeyColumn>;
}
