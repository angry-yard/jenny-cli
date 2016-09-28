import {IFile} from "./IFile";

export interface ITemplate {
    sourcePath: string;
    localPath: string;
    files: IFile[];
}