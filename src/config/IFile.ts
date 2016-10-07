export interface IFile {
    name: string;
    service?: string;
    package?: string;
    path?: string;
    fileName: string;
    output: string;
    fileType: string;
    generationMethod: string;
    tables: string[];
}