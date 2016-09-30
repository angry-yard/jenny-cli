import * as handlebars from "handlebars";
import * as fs from "fs";
import * as Promise from "bluebird";
import * as path from "path";
import * as _ from "underscore";
import {IGenerator} from "../interfaces/IGenerator";
import {Helpers} from "./Helpers";
import {IConfigFile} from "../../config/IConfigFile";
import {Table} from "../../database/common/Table";
import {FileType} from "../fileTypes/FileType";
import {File} from "../fileTypes/File";
import {JString} from "../../strings/JString";
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
            template.templatePath = file.fileName;

            var source = fs.readFileSync(`generators/${this.configFile.templateEngine}/templates/${template.templatePath}`);

            template.contents = source.toString();

            this.templates.push(template);
        })
    }

    processTemplate = (table: Table): Promise<Table> => {
        var deferred = Promise.defer<Table>();

        _.each(this.templates, (file: File) => {
            console.log(`writing ${file.name} for table - ${table.name}`);

            var outputFileName = new JString(table.name).toSingular().toPascalCase().toString();

            // See if template output already exists to include any deltas
            //var deltas = this.getDeltas(path.join(output, outputFileName + "." + file.extension), file);

            // Read template
            var template = handlebars.compile(file.contents);
            var fileContents = template({table: table, configFile: this.configFile});
            var filePath = path.join(file.outputPath, outputFileName + "." + file.extension);

            if (!fs.existsSync(file.outputPath)) {
                fs.mkdirSync(file.outputPath);
            }

            fs.writeFileSync(filePath, fileContents);

            deferred.resolve(table);
        });

        return deferred.promise;
    };

    getDeltas = (fileName: string, file: File): string => {
        var startDeltaString = file.startBlockCommentString + " --- Start Deltas ---" + file.endBlockCommentString;
        var endDeltaString = file.startBlockCommentString + " --- End Deltas ---" + file.endBlockCommentString;
        var regex = new RegExp(startDeltaString);
        var source = fs.readFileSync(fileName);
        var content = source.toString();
        var deltas = regex.exec(content);

        return deltas[1];
    };
}