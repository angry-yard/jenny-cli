///<reference path="../../typings/index.d.ts"/>

import * as knex from "knex";

export class QueryBuilder {
    private sql: knex;

    constructor() {
        this.sql = knex({client: "mssql"});
    }

    getTables = (includedTables?: string[], excludedTables?: string[]): string => {
        return this.sql("table").insert("test").toString();
    };
}