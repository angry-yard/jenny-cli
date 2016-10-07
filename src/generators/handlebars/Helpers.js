"use strict";
var handlebars = require("handlebars");
var jenny_database_1 = require("jenny-database");
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.registerHelpers = function () {
        handlebars.registerHelper("toPascalCase", function (item) {
            var jstring = new jenny_database_1.JString(item);
            return jstring.toPascalCase().toString();
        });
        handlebars.registerHelper("toSingular", function (item) {
            var jstring = new jenny_database_1.JString(item);
            return jstring.toSingular().toString();
        });
        handlebars.registerHelper("toPlural", function (item) {
            var jstring = new jenny_database_1.JString(item);
            return jstring.toPlural().toString();
        });
        handlebars.registerHelper("toCamelCase", function (item) {
            var jstring = new jenny_database_1.JString(item);
            return jstring.toCamelCase().toString();
        });
        handlebars.registerHelper("isEqual", function (item1, item2) {
            return item1 === item2;
        });
        handlebars.registerHelper("isGreater", function (item1, item2) {
            return item1 > item2;
        });
        handlebars.registerHelper("newLine", function (item) {
            return "\n";
        });
        handlebars.registerHelper("tab", function (item) {
            return "\t";
        });
        handlebars.registerHelper("deltas", function (item) {
            return null;
        });
        handlebars.registerHelper("removeId", function (item) {
            return item.replace("Id", "");
        });
        handlebars.registerHelper("commaList", function (columns, options) {
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
    };
    return Helpers;
}());
exports.Helpers = Helpers;
//# sourceMappingURL=Helpers.js.map