import {PrimaryKeyColumn} from "./PrimaryKeyColumn";
import {IPrimaryKeyColumn} from "./interfaces/IPrimaryKeyColumn";
import {IPrimaryKey} from "./interfaces/IPrimaryKey";

export class PrimaryKey implements IPrimaryKey {
    constructor(primaryKeyColumns: Array<PrimaryKeyColumn>) {
        this.primaryKeyColumns = primaryKeyColumns;
    }

    primaryKeyColumns: Array<IPrimaryKeyColumn>;
}
