"use strict";
var TypeConvertor_1 = require("../../strings/TypeConvertor");
var Column = (function () {
    function Column(table, columnDefinition) {
        this.table = table;
        this.id = columnDefinition.column_id;
        this.name = columnDefinition.column_name;
        this.types = new TypeConvertor_1.TypeConvertor(columnDefinition.data_type);
        this.maxLength = columnDefinition.max_length;
        this.precision = columnDefinition.precision;
        this.scale = columnDefinition.scale;
        this.isNullable = columnDefinition.is_nullable;
        this.isIdentity = columnDefinition.is_identity;
        this.isRowGuid = columnDefinition.is_rowguidcol;
        this.isComputed = columnDefinition.is_computed;
        this.isPrimaryKey = false;
        this.isForeignKey = false;
    }
    return Column;
}());
exports.Column = Column;
//# sourceMappingURL=Column.js.map