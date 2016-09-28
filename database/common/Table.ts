import {ITable} from "./interfaces/ITable";
import {Column} from "./Column";
import {IPrimaryKey} from "./interfaces/IPrimaryKey";
import {ITableResponse} from "./interfaces/ITableResponse";

export class Table implements ITable {
    constructor(tableDefinition: ITableResponse) {
        this.id = tableDefinition.table_id;
        this.name = tableDefinition.table_name;
        this.schema = tableDefinition.table_schema;
        this.columns = [];
    }

    id: number;
    schema: string;
    name: string;
    primaryKey: IPrimaryKey;
    columns: Array<Column>;
}