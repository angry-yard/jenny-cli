import * as handlebars from "handlebars";
import * as fs from "fs";
import * as Promise from "bluebird";
import * as path from "path";
import * as _ from "underscore";
import {IGenerator} from "../interfaces/IGenerator";
import {Helpers} from "./Helpers";
import {IConfigFile} from "../../config/IConfigFile";
import {Table} from "jenny-database/Table";
import {JString} from "jenny-database/strings/JString";
import {FileType} from "../fileTypes/FileType";
import {File} from "../fileTypes/File";
import {IFile} from "../../config/IFile";

export class Generator implements IGenerator {
    private templates: File[];

    constructor(private configFile: IConfigFile) {
        // Register handlebars helpers
        Helpers.registerHelpers();
        this.templates = [];

        // Load all templates from disk
        _.each(configFile.templates.files, (file: IFile) => {
            var fileType: FileType = FileType[file.fileType];
            var template = new File(fileType);

            template.name = file.name;
            template.outputPath = file.output;
            template.templatePath = path.join(file.path, file.fileName);
            template.generationMethod = file.generationMethod;
            template.tableNames = file.tables;

            if (!fs.existsSync(template.templatePath)) {
                // Template cannot be found
                console.log(`Template ${template.templatePath} cannot be found.  Be check the config file.`);
                process.exit();
            }

            // Template file can be a global or local npm package or can have the path set
            var source = fs.readFileSync(template.templatePath);

            template.contents = source.toString();

            this.templates.push(template);
        })
    }

    processTemplates = (tables: Table[]): Promise<void> => {
        var deferred = Promise.defer<void>();

        _.each(this.templates, (file: File) => {
            // Get tables associated with template
            var usedTables: Table[] = [];

            _.each(tables, (table: Table) => {
                if (_.contains(file.tableNames, table.name)) {
                    usedTables.push(table);
                }
            });

            switch (file.generationMethod) {
                case "single":
                    this.generateFile(usedTables, file);
                    deferred.resolve();

                    break;
                case "multiple":
                    this.generateFiles(usedTables, file)
                        .then(() => {
                            deferred.resolve();
                        });

                    break;
            }
        });

        return deferred.promise;
    };

    private getDeltas = (fileName: string, file: File): string => {
        var startDeltaString = file.startBlockCommentString + " --- Start Deltas ---" + file.endBlockCommentString;
        var endDeltaString = file.startBlockCommentString + " --- End Deltas ---" + file.endBlockCommentString;
        var regex = new RegExp(startDeltaString);
        var source = fs.readFileSync(fileName);
        var content = source.toString();
        var deltas = regex.exec(content);

        return deltas[1];
    };

    private generateFile = (tables: Table[], file: File): void => {
        console.log(`writing ${file.name}`);

        this.processTemplate(file, tables);

        // Read template
        var template = handlebars.compile(file.contents);
        var fileContents = template({tables: tables, variables: this.configFile.globalVariables});
        var filePath = file.outputPath;
        var directory = path.dirname(filePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        fs.writeFileSync(filePath, fileContents);
    };

    private generateFiles = (tables: Table[], file: File): Promise<void> => {
        var deferred = Promise.defer<void>();
        var lastTable = _.last(tables);

        _.each(tables, (table: Table) => {
            console.log(`writing ${file.name} for table - ${table.name}`);

            this.processTemplate(file, null, table);

            if (lastTable.id === table.id) {
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    private processTemplate = (file: File, tables: Table[], table?: Table): void => {
        // See if template output already exists to include any deltas
        //var deltas = this.getDeltas(path.join(output, outputFileName + "." + file.extension), file);

        // Read template
        var template = handlebars.compile(file.contents);
        var fileContents: string = "";
        var filePath: string = "";

        if (table) {
            // Only a single table is being passed to template
            var outputFileName = new JString(table.name).toSingular().toPascalCase().toString();
            fileContents = template({table: table, variables: this.configFile.globalVariables});
            filePath = file.outputPath.replace("{{name}}", outputFileName);
        }

        if (tables) {
            // Multiple tables are being passed to template
            fileContents = template({tables: tables, variables: this.configFile.globalVariables});
            filePath = file.outputPath;
        }

        var directory = path.dirname(filePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        fs.writeFileSync(filePath, fileContents);
    };
}