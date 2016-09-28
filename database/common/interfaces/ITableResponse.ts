export interface ITableResponse {
    table_schema: string;
    table_id: number;
    table_name: string;
    column_id: number;
    column_name: string;
    max_length: number;
    precision: number;
    scale: number;
    is_nullable: boolean;
    is_rowguidcol: boolean;
    is_identity: boolean;
    is_computed: boolean;
    data_type: string;
}