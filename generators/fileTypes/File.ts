import {FileType} from "./FileType";

export class File {
    constructor(private fileType: FileType) {
        switch (fileType) {
            case FileType.CSharp:
                this.extension = "cs";
                this.inlineCommentString = "//";
                this.startBlockCommentString = "//";
                this.endBlockCommentString = "";

                break;
            case FileType.Css:
                this.extension = "css";
                this.startBlockCommentString = "//";
                this.endBlockCommentString = "";

                break;
            case FileType.Html:
                this.extension = "html";
                this.inlineCommentString = "";
                this.startBlockCommentString = "<!--";
                this.endBlockCommentString = "-->";

                break;
            case FileType.Javascript:
                this.extension = "js";
                this.inlineCommentString = "//";
                this.startBlockCommentString = "/*";
                this.endBlockCommentString = "*/";

                break;
            case FileType.Sql:
                this.extension = "sql";
                this.inlineCommentString = "--";
                this.startBlockCommentString = "/*";
                this.endBlockCommentString = "*/";

                break;
            case FileType.TypeScript:
                this.extension = "ts";
                this.inlineCommentString = "//";
                this.startBlockCommentString = "/*";
                this.endBlockCommentString = "*/";

                break;
        }
    }

    name: string;
    extension: string;
    contents: string;
    inlineCommentString: string;
    startBlockCommentString: string;
    endBlockCommentString: string;
    outputPath: string;
    templatePath: string;
}