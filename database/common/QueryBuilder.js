///<reference path="../../typings/index.d.ts"/>
"use strict";
var knex = require("knex");
var QueryBuilder = (function () {
    function QueryBuilder() {
        var _this = this;
        this.getTables = function (includedTables, excludedTables) {
            return _this.sql("table").insert("test").toString();
        };
        this.sql = knex({ client: "mssql" });
    }
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map