"use strict";
var JString = (function () {
    function JString(name) {
        var _this = this;
        this.name = name;
        this.plural = {
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
        this.singular = {
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
        this.irregular = {
            'move': "moves",
            'foot': "feet",
            'goose': "geese",
            'sex': "sexes",
            'child': "children",
            'man': "men",
            'tooth': "teeth",
            'person': "people"
        };
        this.uncountable = [
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
        this.toString = function () {
            return _this.name;
        };
        this.toCamelCase = function () {
            _this.name = _this.name
                .replace(/\s(.)/g, function (w) {
                return w.toUpperCase();
            })
                .replace(/\s/g, "")
                .replace(/^(.)/, function (w) {
                return w.toLowerCase();
            });
            return _this;
        };
        this.toPascalCase = function () {
            _this.name = _this.name
                .replace(/\w+/g, function (w) {
                return w[0].toUpperCase() + w.slice(1);
            });
            return _this;
        };
        this.toSingular = function () {
            var name = _this.name;
            if (_this.uncountable.indexOf(name.toLowerCase()) >= 0) {
                _this.name = name;
                return _this;
            }
            for (var word in _this.irregular) {
                var irregularPattern = new RegExp(_this.irregular[word] + "$", "i");
                var replace = word;
                if (irregularPattern.test(_this.name)) {
                    _this.name = _this.name.replace(irregularPattern, replace);
                    return _this;
                }
            }
            for (var reg in _this.singular) {
                var singularPattern = new RegExp(reg, 'i');
                if (singularPattern.test(name)) {
                    _this.name = name.replace(singularPattern, _this.singular[reg]);
                    return _this;
                }
            }
            _this.name = name;
            return _this;
        };
        this.toPlural = function () {
            var name = _this.name;
            if (_this.uncountable.indexOf(name.toLowerCase()) >= 0) {
                _this.name = name;
                return _this;
            }
            for (var word in _this.irregular) {
                var irregularPattern = new RegExp(word + "$", "i");
                var replace = _this.irregular[word];
                if (irregularPattern.test(_this.name)) {
                    _this.name = _this.name.replace(irregularPattern, replace);
                    return _this;
                }
            }
            for (var reg in _this.plural) {
                var pluralPattern = new RegExp(reg, "i");
                if (pluralPattern.test(name)) {
                    _this.name = name.replace(pluralPattern, _this.plural[reg]);
                    return _this;
                }
            }
            _this.name = name;
            return _this;
        };
    }
    return JString;
}());
exports.JString = JString;
//# sourceMappingURL=JString.js.map