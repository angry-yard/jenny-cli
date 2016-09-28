export interface IForeignKeyResponse {
    name: string;
    parent_column_id: number;
    referenced_object_id: number;
    referenced_column_id: number;
}