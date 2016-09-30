import * as Promise from "bluebird";
import {Table} from "../../database/common/Table";
import {IConfigFile} from "../../config/IConfigFile";
import {File} from "../FileTypes/File";

export interface IGenerator {
    processTemplate(table: Table, configFile: IConfigFile): Promise<Table>;
    getDeltas(fileName: string, file: File): string;
}