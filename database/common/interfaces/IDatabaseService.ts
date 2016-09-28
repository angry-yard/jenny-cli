///<reference path="../../../typings/index.d.ts"/>

import * as Promise from 'bluebird';
import {ITable} from "./ITable";

export interface IDatabaseService {
    populateTables(): Promise<Array<ITable>>;
}