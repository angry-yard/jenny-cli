export interface IColumn {
    name: string;
    dataType: string;
    isNullable: boolean;
    isIdentity: boolean;
    dataGenerator: string;
    order: number;
}