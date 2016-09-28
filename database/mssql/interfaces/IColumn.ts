export interface IColumn {
    object_id: number;
    name: string;
    column_id: number;
    system_type_id: number;
    user_type_id: number;
    max_length: number;
    precision: number;
    scale: number;
    collation_name: string;
    is_nullable: boolean;
    is_ansi_padded: boolean;
    is_rowguidcol: boolean;
    is_identity: boolean;
    is_computed: boolean;
    is_filestream: boolean;
    is_replicated: boolean;
    is_non_sql_subscribed: boolean;
    is_merge_published: boolean;
    is_dts_replicated: boolean;
    is_xml_document: boolean;
    xml_collection_id: number;
    default_object_id: number;
    rule_object_id: number;
    is_sparse: boolean;
    is_column_set: boolean;
    column_type: string;
}