"use strict";
var handlebars = require("handlebars");
var fs = require("fs");
var Promise = require("bluebird");
var path = require("path");
var _ = require("underscore");
var Helpers_1 = require("./Helpers");
var jenny_database_1 = require("jenny-database");
var FileType_1 = require("../fileTypes/FileType");
var File_1 = require("../fileTypes/File");
var Generator = (function () {
    function Generator(configFile) {
        var _this = this;
        this.configFile = configFile;
        this.processTemplates = function (tables) {
            var deferred = Promise.defer();
            _.each(_this.templates, function (file) {
                var usedTables = [];
                _.each(tables, function (table) {
                    if (_.contains(file.tableNames, table.name)) {
                        usedTables.push(table);
                    }
                });
                switch (file.generationMethod) {
                    case "single":
                        _this.generateFile(usedTables, file);
                        deferred.resolve();
                        break;
                    case "multiple":
                        _this.generateFiles(usedTables, file)
                            .then(function () {
                            deferred.resolve();
                        });
                        break;
                }
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
        this.generateFile = function (tables, file) {
            console.log("writing " + file.name);
            _this.processTemplate(file, tables);
            var template = handlebars.compile(file.contents);
            var fileContents = template({ tables: tables, variables: _this.configFile.globalVariables });
            var filePath = file.outputPath;
            var directory = path.dirname(filePath);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
            fs.writeFileSync(filePath, fileContents);
        };
        this.generateFiles = function (tables, file) {
            var deferred = Promise.defer();
            var lastTable = _.last(tables);
            _.each(tables, function (table) {
                console.log("writing " + file.name + " for table - " + table.name);
                _this.processTemplate(file, null, table);
                if (lastTable.id === table.id) {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };
        this.processTemplate = function (file, tables, table) {
            var template = handlebars.compile(file.contents);
            var fileContents = "";
            var filePath = "";
            if (table) {
                var outputFileName = new jenny_database_1.JString(table.name).toSingular().toPascalCase().toString();
                fileContents = template({ table: table, variables: _this.configFile.globalVariables });
                filePath = file.outputPath.replace("{{name}}", outputFileName);
            }
            if (tables) {
                fileContents = template({ tables: tables, variables: _this.configFile.globalVariables });
                filePath = file.outputPath;
            }
            var directory = path.dirname(filePath);
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
            fs.writeFileSync(filePath, fileContents);
        };
        Helpers_1.Helpers.registerHelpers();
        this.templates = [];
        _.each(configFile.templates.files, function (file) {
            var fileType = FileType_1.FileType[file.fileType];
            var template = new File_1.File(fileType);
            template.name = file.name;
            template.outputPath = file.output;
            template.templatePath = path.join(file.path, file.fileName);
            template.generationMethod = file.generationMethod;
            template.tableNames = file.tables;
            var source = fs.readFileSync(template.templatePath);
            template.contents = source.toString();
            _this.templates.push(template);
        });
    }
    return Generator;
}());
exports.Generator = Generator;
//# sourceMappingURL=Generator.js.map