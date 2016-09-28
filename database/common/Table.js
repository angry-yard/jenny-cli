"use strict";
var Table = (function () {
    function Table(tableDefinition) {
        this.id = tableDefinition.table_id;
        this.name = tableDefinition.table_name;
        this.schema = tableDefinition.table_schema;
        this.columns = [];
    }
    return Table;
}());
exports.Table = Table;
//# sourceMappingURL=Table.js.map