"use strict";
var FileType_1 = require("./FileType");
var File = (function () {
    function File(fileType) {
        this.fileType = fileType;
        switch (fileType) {
            case FileType_1.FileType.CSharp:
                this.extension = "cs";
                this.inlineCommentString = "//";
                this.startBlockCommentString = "//";
                this.endBlockCommentString = "";
                break;
            case FileType_1.FileType.Css:
                this.extension = "css";
                this.startBlockCommentString = "//";
                this.endBlockCommentString = "";
                break;
            case FileType_1.FileType.Html:
                this.extension = "html";
                this.inlineCommentString = "";
                this.startBlockCommentString = "<!--";
                this.endBlockCommentString = "-->";
                break;
            case FileType_1.FileType.Javascript:
                this.extension = "js";
                this.inlineCommentString = "//";
                this.startBlockCommentString = "/*";
                this.endBlockCommentString = "*/";
                break;
            case FileType_1.FileType.Sql:
                this.extension = "sql";
                this.inlineCommentString = "--";
                this.startBlockCommentString = "/*";
                this.endBlockCommentString = "*/";
                break;
            case FileType_1.FileType.TypeScript:
                this.extension = "ts";
                this.inlineCommentString = "//";
                this.startBlockCommentString = "/*";
                this.endBlockCommentString = "*/";
                break;
        }
    }
    return File;
}());
exports.File = File;
//# sourceMappingURL=File.js.map