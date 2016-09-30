export class JString {
    constructor(private name: string) {
    }

    private plural = {
        '(quiz)$': "$1zes",
        '^(ox)$': "$1en",
        '([m|l])ouse$': "$1ice",
        '(matr|vert|ind)ix|ex$': "$1ices",
        '(x|ch|ss|sh)$': "$1es",
        '([^aeiouy]|qu)y$': "$1ies",
        '(hive)$': "$1s",
        '(?:([^f])fe|([lr])f)$': "$1$2ves",
        '(shea|lea|loa|thie)f$': "$1ves",
        'sis$': "ses",
        '([ti])um$': "$1a",
        '(tomat|potat|ech|her|vet)o$': "$1oes",
        '(bu)s$': "$1ses",
        '(alias)$': "$1es",
        '(octop)us$': "$1i",
        '(ax|test)is$': "$1es",
        '(us)$': "$1es",
        's$': "s"
    };

    private singular = {
        '(quiz)zes$': "$1",
        '(matr)ices$': "$1ix",
        '(vert|ind)ices$': "$1ex",
        '^(ox)en$': "$1",
        '(alias)es$': "$1",
        '(octop|vir)i$': "$1us",
        '(cris|ax|test)es$': "$1is",
        '(shoe)s$': "$1",
        '(o)es$': "$1",
        '(bus)es$': "$1",
        '([m|l])ice$': "$1ouse",
        '(x|ch|ss|sh)es$': "$1",
        '(m)ovies$': "$1ovie",
        '(s)eries$': "$1eries",
        '([^aeiouy]|qu)ies$': "$1y",
        '([lr])ves$': "$1f",
        '(tive)s$': "$1",
        '(hive)s$': "$1",
        '(li|wi|kni)ves$': "$1fe",
        '(shea|loa|lea|thie)ves$': "$1f",
        '(^analy)ses$': "$1sis",
        '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
        '([ti])a$': "$1um",
        '(n)ews$': "$1ews",
        '(h|bl)ouses$': "$1ouse",
        '(corpse)s$': "$1",
        '(us)es$': "$1",
        's$': ""
    };

    private irregular = {
        'move': "moves",
        'foot': "feet",
        'goose': "geese",
        'sex': "sexes",
        'child': "children",
        'man': "men",
        'tooth': "teeth",
        'person': "people"
    };

    private uncountable = [
        "sheep",
        "fish",
        "deer",
        "series",
        "species",
        "money",
        "rice",
        "information",
        "equipment"
    ];

    toString = (): string => {
        return this.name;
    };

    toCamelCase = (): JString => {
        this.name = this.name
            .replace(/\s(.)/g, (w) => {
                return w.toUpperCase();
            })
            .replace(/\s/g, "")
            .replace(/^(.)/, (w) => {
                return w.toLowerCase();
            });

        return this;
    };

    toPascalCase = (): JString => {
        this.name = this.name
            .replace(/\w+/g, (w) => {
                return w[0].toUpperCase() + w.slice(1)
            });

        return this;
    };

    toSingular = (): JString => {
        var name = this.name;

        // save some time in the case that singular and plural are the same
        if (this.uncountable.indexOf(name.toLowerCase()) >= 0) {
            this.name = name;
            return this;
        }


        // check for irregular forms
        for (var word in this.irregular) {
            var irregularPattern = new RegExp(this.irregular[word] + "$", "i");
            var replace = word;

            if (irregularPattern.test(this.name)) {
                this.name = this.name.replace(irregularPattern, replace);
                return this;
            }
        }

        // check for matches using regular expressions
        for (var reg in this.singular) {
            var singularPattern = new RegExp(reg, 'i');

            if (singularPattern.test(name)) {
                this.name = name.replace(singularPattern, this.singular[reg]);
                return this;
            }
        }

        this.name = name;
        return this;
    };

    toPlural = (): JString => {
        var name = this.name;

        // save some time in the case that singular and plural are the same
        if (this.uncountable.indexOf(name.toLowerCase()) >= 0) {
            this.name = name;
            return this;
        }

        // check for irregular forms
        for (var word in this.irregular) {
            var irregularPattern = new RegExp(word + "$", "i");
            var replace = this.irregular[word];

            if (irregularPattern.test(this.name)) {
                this.name = this.name.replace(irregularPattern, replace);
                return this;
            }
        }

        // check for matches using regular expressions
        for (var reg in this.plural) {
            var pluralPattern = new RegExp(reg, "i");

            if (pluralPattern.test(name)) {
                this.name = name.replace(pluralPattern, this.plural[reg]);
                return this;
            }
        }

        this.name = name;
        return this;
    };
}