"use strict";
var handlebars = require("handlebars");
var JString_1 = require("../../strings/JString");
var Helpers = (function () {
    function Helpers() {
    }
    Helpers.registerHelpers = function () {
        handlebars.registerHelper("toPascalCase", function (item) {
            var jstring = new JString_1.JString(item);
            return jstring.toPascalCase().toString();
        });
        handlebars.registerHelper("toSingular", function (item) {
            var jstring = new JString_1.JString(item);
            return jstring.toSingular().toString();
        });
        handlebars.registerHelper("toCamelCase", function (item) {
            var jstring = new JString_1.JString(item);
            return jstring.toCamelCase().toString();
        });
        handlebars.registerHelper("deltas", function (item) {
            return null;
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