///<reference path="../typings/index.d.ts"/>
"use strict";
var Commands = (function () {
    function Commands() {
        var _this = this;
        this.findNextParameter = function (items) {
            var returned = 0;
            items.forEach(function (item, index) {
                if (item.indexOf("-") === 0) {
                    returned = index;
                    return;
                }
            });
            return returned;
        };
        this.action = process.argv[2];
        var args = process.argv.slice(3);
        // Look for each parameter
        args.forEach(function (item, index) {
            switch (item) {
                case "-database":
                    _this.databaseName = args[index + 1];
                    break;
                case "-templates":
                    var remainingItems = args.slice(index + 1);
                    var index1 = _this.findNextParameter(remainingItems);
                    if (index1 === 0) {
                        _this.templates = remainingItems;
                    }
                    else {
                        _this.templates = args.slice(index + 1, index1);
                    }
                    break;
                case "-tables":
                    var remainingTables = args.slice(index + 1);
                    var index2 = _this.findNextParameter(remainingTables);
                    if (index2 === 0) {
                        _this.tables = remainingTables;
                    }
                    else {
                        _this.tables = remainingTables.slice(0, index2);
                    }
                    break;
            }
        });
    }
    return Commands;
}());
exports.Commands = Commands;
//# sourceMappingURL=Commands.js.map