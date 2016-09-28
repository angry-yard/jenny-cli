import {ITable} from "./ITable";
import {ITypeConvertor} from "../../../strings/interfaces/ITypeConvertor";

export interface IColumn {
    id: number;
    table: ITable;
    name: string;
    maxLength: number;
    precision: number;
    scale: number;
    isNullable: boolean;
    isIdentity: boolean;
    isRowGuid: boolean;
    isComputed: boolean;
    types: ITypeConvertor;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    foreignKey?: IColumn;
}