import {IPrimaryKeyColumn} from "./IPrimaryKeyColumn";

export interface IPrimaryKey {
    primaryKeyColumns: Array<IPrimaryKeyColumn>;
}
