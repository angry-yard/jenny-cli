///<reference path="../../typings/index.d.ts"/>

import * as sql from "mssql";
import * as Promise from "bluebird";
import * as _ from "underscore";
import {IDatabaseService} from "../common/interfaces/IDatabaseService";
import {IDatabase} from "../../config/IDatabase";
import {Table} from "../common/Table";
import {Queries} from "./Queries";
import {Column} from "../common/Column";
import {IForeignKeyResponse} from "../common/interfaces/IForeignKeyResponse";
import {ITableResponse} from "../common/interfaces/ITableResponse";
import {IPrimaryKeyColumn} from "../common/interfaces/IPrimaryKeyColumn";
import {IPrimaryKeyResponse} from "../common/interfaces/IPrimaryKeyResponse";

export class DatabaseService implements IDatabaseService {
    private sqlConfig: sql.config;

    constructor(private config: IDatabase) {
        this.sqlConfig = {
            user: config.connectionInformation.username,
            password: config.connectionInformation.password,
            server: config.connectionInformation.server,
            database: config.connectionInformation.databaseName
        }
    }

    populateTables = (): Promise<Array<Table>> => {
        var connection = new sql.Connection(this.sqlConfig);
        var deferredResult = Promise.defer<Array<Table>>();

        connection
            .connect()
            .then(() => {
                this.createTables(connection)
                    .then((tables: Table[]) => {
                        Promise
                            .all([this.getPrimaryKeys(connection, tables), this.getForeignKeys(connection, tables)])
                            .then(() => {
                                deferredResult.resolve(tables);
                                connection.close();
                            })
                            .catch((error: any) => {
                                console.log(error);
                            })
                    });
            });

        return deferredResult.promise;
    };

    private createTables = (connection: sql.Connection): Promise<Array<Table>> => {
        var tables: Array<Table> = [];
        var deferredResult = Promise.defer<Array<Table>>();
        var request = new sql.Request(connection);
        var includedTables = this.config.tablesConfig.include;
        var excludedTables = this.config.tablesConfig.exclude;

        request
            .query<ITableResponse>(Queries.getTables(includedTables, excludedTables))
            .then((recordset: ITableResponse[]) => {
                var tableId = 0;
                var table: Table;

                _.each(recordset, (record: ITableResponse) => {
                    if (tableId !== record.table_id) {
                        // Table has already been created
                        table = new Table(record);
                        tables.push(table);

                        tableId = record.table_id;
                    }

                    // Add column
                    var column = new Column(table, record);
                    table.columns.push(column);
                });

                deferredResult.resolve(tables);
            })
            .catch((error: sql.RequestError) => {
                console.log(error);
            });

        return deferredResult.promise;
    };

    private getPrimaryKeys = (connection: sql.Connection, tables: Table[]): Promise<void> => {
        var deferredResult = Promise.defer<void>();
        var tableCount = 0;

        _.each(tables, (table: Table) => {
            var request = new sql.Request(connection);

            request
                .query<IPrimaryKeyColumn>(Queries.getPrimaryKeys(table.id))
                .then((recordset: IPrimaryKeyResponse[]) => {
                    tableCount++;

                    _.each(recordset, (record: IPrimaryKeyResponse) => {

                    });
                });
        });

        deferredResult.resolve();

        return deferredResult.promise;
    };

    private getForeignKeys = (connection: sql.Connection, tables: Table[]): Promise<void> => {
        var deferredResult = Promise.defer<void>();
        var tableCount = 0;

        _.each(tables, (table: Table) => {
            var request = new sql.Request(connection);

            request
                .query<IForeignKeyResponse>(Queries.getForeignKeys(table.id))
                .then((recordset: IForeignKeyResponse[]) => {
                    tableCount++;

                    _.each(recordset, (record: IForeignKeyResponse) => {
                        if (recordset) {
                            var referencedTable = _.findWhere(tables, {id: record.referenced_object_id});

                            if (!table) {
                                console.log("There was an error finding the table");
                            } else {
                                var referencedColumn = _.findWhere(referencedTable.columns, {id: record.referenced_column_id});

                                _.each(table.columns, (column: Column) => {
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
                .catch((error: any) => {
                    console.log(error);
                });
        });

        return deferredResult.promise;
    };
}