"use strict";
var TypeConvertor = (function () {
    function TypeConvertor(databaseType) {
        var _this = this;
        this.databaseType = databaseType;
        this.toJavascriptType = function () {
            var name = "";
            switch (_this.databaseType) {
                case "int":
                    name = "number";
                    break;
                case "varchar":
                case "nvarchar":
                    name = "string";
                    break;
                case "smalldatetime":
                    name = "Date";
                    break;
                case "bit":
                    name = "boolean";
                    break;
            }
            return name;
        };
        this.toDatabaseType = function () {
            return _this.databaseType;
        };
        this.toCSharpType = function () {
            var name = "";
            switch (_this.databaseType) {
                case "int":
                    name = "int";
                    break;
                case "varchar":
                    name = "string";
                    break;
                case "smalldatetime":
                    name = "DateTime";
                    break;
            }
            return name;
        };
    }
    return TypeConvertor;
}());
exports.TypeConvertor = TypeConvertor;
//# sourceMappingURL=TypeConvertor.js.map