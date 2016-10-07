import * as Promise from "bluebird";
import {Table} from "jenny-database";

export interface IGenerator {
    processTemplates(tables: Table[]): Promise<void>;
}