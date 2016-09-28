import {IColumn} from "./interfaces/IColumn";
import {Table} from "./Table";
import {TypeConvertor} from "../../strings/TypeConvertor";
import {ITableResponse} from "./interfaces/ITableResponse";

export class Column implements IColumn {
    constructor(table: Table, columnDefinition: ITableResponse) {
        this.table = table;
        this.id = columnDefinition.column_id;
        this.name = columnDefinition.column_name;
        this.types = new TypeConvertor(columnDefinition.data_type);
        this.maxLength = columnDefinition.max_length;
        this.precision = columnDefinition.precision;
        this.scale = columnDefinition.scale;
        this.isNullable = columnDefinition.is_nullable;
        this.isIdentity = columnDefinition.is_identity;
        this.isRowGuid = columnDefinition.is_rowguidcol;
        this.isComputed = columnDefinition.is_computed;
        this.isPrimaryKey = false;
        this.isForeignKey = false;
    }

    id: number;
    table: Table;
    name: string;
    maxLength: number;
    precision: number;
    scale: number;
    isNullable: boolean;
    isIdentity: boolean;
    isRowGuid: boolean;
    isComputed: boolean;
    types: TypeConvertor;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    foreignKey: IColumn;
}