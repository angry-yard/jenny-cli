"use strict";
var sql = require("mssql");
var Promise = require("bluebird");
var _ = require("underscore");
var Table_1 = require("../common/Table");
var Queries_1 = require("./Queries");
var Column_1 = require("../common/Column");
var DatabaseService = (function () {
    function DatabaseService(config) {
        var _this = this;
        this.config = config;
        this.populateTables = function () {
            var connection = new sql.Connection(_this.sqlConfig);
            var deferredResult = Promise.defer();
            connection
                .connect()
                .then(function () {
                _this.createTables(connection)
                    .then(function (tables) {
                    Promise
                        .all([_this.getPrimaryKeys(connection, tables), _this.getForeignKeys(connection, tables)])
                        .then(function () {
                        deferredResult.resolve(tables);
                        connection.close();
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                });
            });
            return deferredResult.promise;
        };
        this.createTables = function (connection) {
            var tables = [];
            var deferredResult = Promise.defer();
            var request = new sql.Request(connection);
            var includedTables = _this.config.tablesConfig.include;
            var excludedTables = _this.config.tablesConfig.exclude;
            request
                .query(Queries_1.Queries.getTables(includedTables, excludedTables))
                .then(function (recordset) {
                var tableId = 0;
                var table;
                _.each(recordset, function (record) {
                    if (tableId !== record.table_id) {
                        table = new Table_1.Table(record);
                        tables.push(table);
                        tableId = record.table_id;
                    }
                    var column = new Column_1.Column(table, record);
                    table.columns.push(column);
                });
                deferredResult.resolve(tables);
            })
                .catch(function (error) {
                console.log(error);
            });
            return deferredResult.promise;
        };
        this.getPrimaryKeys = function (connection, tables) {
            var deferredResult = Promise.defer();
            var tableCount = 0;
            _.each(tables, function (table) {
                var request = new sql.Request(connection);
                request
                    .query(Queries_1.Queries.getPrimaryKeys(table.id))
                    .then(function (recordset) {
                    tableCount++;
                    _.each(recordset, function (record) {
                    });
                });
            });
            deferredResult.resolve();
            return deferredResult.promise;
        };
        this.getForeignKeys = function (connection, tables) {
            var deferredResult = Promise.defer();
            var tableCount = 0;
            _.each(tables, function (table) {
                var request = new sql.Request(connection);
                request
                    .query(Queries_1.Queries.getForeignKeys(table.id))
                    .then(function (recordset) {
                    tableCount++;
                    _.each(recordset, function (record) {
                        if (recordset) {
                            var referencedTable = _.findWhere(tables, { id: record.referenced_object_id });
                            if (!table) {
                                console.log("There was an error finding the table");
                            }
                            else {
                                var referencedColumn = _.findWhere(referencedTable.columns, { id: record.referenced_column_id });
                                _.each(table.columns, function (column) {
                                    if (column.id === record.parent_column_id) {
                                        column.isForeignKey = true;
                                        column.foreignKey = referencedColumn;
                                    }
                                });
                            }
                        }
                    });
                    if (tableCount === tables.length) {
                        deferredResult.resolve();
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                });
            });
            return deferredResult.promise;
        };
        this.sqlConfig = {
            user: config.connectionInformation.username,
            password: config.connectionInformation.password,
            server: config.connectionInformation.server,
            database: config.connectionInformation.databaseName
        };
    }
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map