///<reference path="../typings/index.d.ts"/>

export class Commands {
    constructor() {
        this.action = process.argv[2];

        var args = process.argv.slice(3);

        // Look for each parameter
        args.forEach((item: string, index: number) => {
            switch (item) {
                case "-database":
                    this.databaseName = args[index + 1];
                    break;
                case "-templates":
                    var remainingItems = args.slice(index + 1);
                    var index1 = this.findNextParameter(remainingItems);

                    if (index1 === 0) {
                        this.templates = remainingItems;
                    } else {
                        this.templates = args.slice(index + 1, index1);
                    }

                    break;
                case "-tables":
                    var remainingTables = args.slice(index + 1);
                    var index2 = this.findNextParameter(remainingTables);

                    if (index2 === 0) {
                        this.tables = remainingTables;
                    } else {
                        this.tables = remainingTables.slice(0, index2);
                    }

                    break;
            }
        });
    }

    action: string;
    databaseName: string;
    tables: string[];
    templates: string[];

    private findNextParameter = (items: string[]): number => {
        var returned = 0;

        items.forEach((item: string, index: number) => {
            if (item.indexOf("-") === 0) {
                returned = index;
                return;
            }
        });

        return returned;
    }
}