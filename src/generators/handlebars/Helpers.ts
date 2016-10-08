import * as handlebars from "handlebars";
import {JString} from "jenny-database/strings/JString";
import {ICommaListOptions} from "./interfaces/ICommaListOptions";

export class Helpers {
    static registerHelpers = () => {
        handlebars.registerHelper("toPascalCase", (item: string): string => {
            var jstring = new JString(item);
            return jstring.toPascalCase().toString();
        });

        handlebars.registerHelper("toSingular", (item: string): string => {
            var jstring = new JString(item);
            return jstring.toSingular().toString();
        });

        handlebars.registerHelper("toPlural", (item: string): string => {
            var jstring = new JString(item);
            return jstring.toPlural().toString();
        });

        handlebars.registerHelper("toCamelCase", (item: string): string => {
            var jstring = new JString(item);
            return jstring.toCamelCase().toString();
        });

        handlebars.registerHelper("isEqual", (item1: string, item2: string): boolean => {
            return item1 === item2;
        });

        handlebars.registerHelper("isGreater", (item1: number, item2: number): boolean => {
            return item1 > item2;
        });

        handlebars.registerHelper("newLine", (item: string): string => {
            return "\n";
        });

        handlebars.registerHelper("tab", (item: string): string => {
            return "\t";
        });

        handlebars.registerHelper("deltas", (item: string): string => {
            return null;
        });

        handlebars.registerHelper("removeId", (item: string): string => {
            return item.replace("Id", "");
        });

        handlebars.registerHelper("commaList", (columns: any, options?: ICommaListOptions) => {
            var output = "";
            var comma = "";

            if (options.addComma) {
                comma = ",";
            }

            for (var i = 0, l = columns.length; i < l; i++) {
                if (i === l - 1) {
                    comma = "";
                }

                output += options.fn(columns[i]) + comma;
            }

            return output;
        });
    }
}