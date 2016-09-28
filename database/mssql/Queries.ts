export class Queries {
    static getTables = (includedTables?: string[], excludedTables?: string[]): string => {
        var includedWhere = "";
        var excludedWhere = "";

        if (includedTables) {
            includedWhere = ` t.name in ('${includedTables.join("','")}')`;
        }

        if (excludedTables) {
            var subSql = includedWhere ? "and" : "";

            excludedWhere = ` ${subSql} t.name not in ('${excludedTables.join("','")}')`;
        }

        return `SELECT SCHEMA_NAME(t.schema_id) AS table_schema,
            t.name as table_name,
            t.object_id as table_id,
            c.name as column_name, 
            c.column_id,
            c.max_length,
            c.precision,
            c.scale,
            c.is_nullable,
            c.is_rowguidcol,
            c.is_identity,
            c.is_computed,
            ty.name as data_type
        FROM sys.tables t
        INNER JOIN sys.columns c ON c.object_id = t.object_id
        INNER JOIN sys.types ty on ty.system_type_id = c.system_type_id
        WHERE ty.name <> 'sysname' and ${includedWhere}${excludedWhere}
        order by t.name, c.column_id`;
    };

    static getForeignKeys = (objectId: number): string => {
        return `select f.name, fc.parent_column_id, fc.referenced_object_id, fc.referenced_column_id from sys.foreign_keys f inner join sys.foreign_key_columns fc ON f.OBJECT_ID = fc.constraint_object_id where f.parent_object_id = ${objectId}`;
    };

    static getPrimaryKeys = (objectId: number): string => {
        return "";
    };
}
