angular.module('floraService', []).service('Flora', function () {

    var generateWords = function (links, word) {
        var initial = '>';
        var terminal = '<';
        word = word ? word : initial;
        if ( word.indexOf(terminal) == -1 ) {
            options = links[word.substr(word.length -2, word.length)];
            addon = pick(options);

            word = word + addon;
            return generateWords(links, word);
        }
        return word.substring(1, word.length-1);
    };

    var pick = function (options) {
        return options[Math.floor(Math.random() * (options.length - 1) )];
    };

    return {
        getGenus: function () {
            return generateWords(genus_links);
        },

        getSpecies: function () {
            return generateWords(species_links);
        },

        getCommon: function () {
            var name = pick(commonFirst);
            if (Math.random() > 0.5 ) {
                name += ' ' + pick(commonFirst);
            }
            name += ' ' + pick(commonSecond);
            return name;
        }
    };
});