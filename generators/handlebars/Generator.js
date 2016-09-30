"use strict";
var handlebars = require("handlebars");
var fs = require("fs");
var Promise = require("bluebird");
var path = require("path");
var _ = require("underscore");
var Helpers_1 = require("./Helpers");
var FileType_1 = require("../fileTypes/FileType");
var File_1 = require("../fileTypes/File");
var JString_1 = require("../../strings/JString");
var Generator = (function () {
    function Generator(configFile) {
        var _this = this;
        this.configFile = configFile;
        this.processTemplate = function (table) {
            var deferred = Promise.defer();
            _.each(_this.templates, function (file) {
                console.log("writing " + file.name + " for table - " + table.name);
                var outputFileName = new JString_1.JString(table.name).toSingular().toPascalCase().toString();
                var template = handlebars.compile(file.contents);
                var fileContents = template({ table: table, configFile: _this.configFile });
                var filePath = path.join(file.outputPath, outputFileName + "." + file.extension);
                if (!fs.existsSync(file.outputPath)) {
                    fs.mkdirSync(file.outputPath);
                }
                fs.writeFileSync(filePath, fileContents);
                deferred.resolve(table);
            });
            return deferred.promise;
        };
        this.getDeltas = function (fileName, file) {
            var startDeltaString = file.startBlockCommentString + " --- Start Deltas ---" + file.endBlockCommentString;
            var endDeltaString = file.startBlockCommentString + " --- End Deltas ---" + file.endBlockCommentString;
            var regex = new RegExp(startDeltaString);
            var source = fs.readFileSync(fileName);
            var content = source.toString();
            var deltas = regex.exec(content);
            return deltas[1];
        };
        Helpers_1.Helpers.registerHelpers();
        this.templates = [];
        _.each(configFile.templates.files, function (file) {
            var fileType = FileType_1.FileType[file.fileType];
            var template = new File_1.File(fileType);
            template.name = file.name;
            template.outputPath = file.output;
            template.templatePath = file.fileName;
            var source = fs.readFileSync("generators/" + _this.configFile.templateEngine + "/templates/" + template.templatePath);
            template.contents = source.toString();
            _this.templates.push(template);
        });
    }
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=Generator.js.map