import {IColumn} from "./IColumn";
import {IVirtualColumn} from "./IVirutalColumn";

export interface ITable {
    name: string;
    columns: IColumn[];
    virutalColumns: IVirtualColumn[];
    templates: string[];
    parameters: { [key: string]: string; }
}