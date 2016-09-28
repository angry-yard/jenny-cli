"use strict";
var Queries = (function () {
    function Queries() {
    }
    Queries.getTables = function (includedTables, excludedTables) {
        var includedWhere = "";
        var excludedWhere = "";
        if (includedTables) {
            includedWhere = " t.name in ('" + includedTables.join("','") + "')";
        }
        if (excludedTables) {
            var subSql = includedWhere ? "and" : "";
            excludedWhere = " " + subSql + " t.name not in ('" + excludedTables.join("','") + "')";
        }
        return "SELECT SCHEMA_NAME(t.schema_id) AS table_schema,\n            t.name as table_name,\n            t.object_id as table_id,\n            c.name as column_name, \n            c.column_id,\n            c.max_length,\n            c.precision,\n            c.scale,\n            c.is_nullable,\n            c.is_rowguidcol,\n            c.is_identity,\n            c.is_computed,\n            ty.name as data_type\n        FROM sys.tables t\n        INNER JOIN sys.columns c ON c.object_id = t.object_id\n        INNER JOIN sys.types ty on ty.system_type_id = c.system_type_id\n        WHERE ty.name <> 'sysname' and " + includedWhere + excludedWhere + "\n        order by t.name, c.column_id";
    };
    Queries.getForeignKeys = function (objectId) {
        return "select f.name, fc.parent_column_id, fc.referenced_object_id, fc.referenced_column_id from sys.foreign_keys f inner join sys.foreign_key_columns fc ON f.OBJECT_ID = fc.constraint_object_id where f.parent_object_id = " + objectId;
    };
    Queries.getPrimaryKeys = function (objectId) {
        return "";
    };
    return Queries;
}());
exports.Queries = Queries;
//# sourceMappingURL=Queries.js.map