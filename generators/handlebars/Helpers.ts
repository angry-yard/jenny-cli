///<reference path="../../typings/index.d.ts"/>

import * as handlebars from "handlebars";
import {JString} from "../../strings/JString";
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

        handlebars.registerHelper("toCamelCase", (item: string): string => {
            var jstring = new JString(item);
            return jstring.toCamelCase().toString();
        });

        handlebars.registerHelper("deltas", (item: string): string => {
            return null;
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