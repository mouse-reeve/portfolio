function FloraCtrl($scope) {
    // hackily recreates the python WordBuilder repo and the NominaFlora data
    $scope.names = [];

    var getGenus = function () {
        return generateWords(genus_links);
    };

    var getSpecies = function () {
        return generateWords(species_links);
    };

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

    for (var i = 0; i < 5; i++) {
        $scope.names.push(getGenus() + ' ' + getSpecies());
    }
}
