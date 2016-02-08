angular.module('thesaurusDirective', []).directive('thesaurus', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var text = element[0].childNodes[0].data;
            var words = text.split(' ');
            var place = 0;

            var tick = function () {
                if (place >= words.length) {
                    place = 0;
                }
                var word = words[place];
                if (word) {
                    var capitalize = false;
                    var punctuation = '';
                    if (word !== word.toLowerCase()) {
                        word = word.toLowerCase();
                        capitalize = true;
                    }
                    if (word.slice(-1).match(/[,\.]/) !== null) {
                        punctuation = word.slice(-1);
                        word = word.slice(0, -1);
                    }

                    if (thesaurus[word]) {
                        synonyms = thesaurus[word];
                        var rand = Math.floor(Math.random() * synonyms.length);
                        word = synonyms[rand];
                        if (capitalize) {
                            word = word.slice(0, 1).toUpperCase() + word.slice(1);
                        }
                        if (punctuation) {
                            word += punctuation;
                        }

                        words[place] = word;
                        element[0].childNodes[0].data = words.join(' ');
                    }
                }
                place++;

                timeout = $timeout(tick, 1000);
            }
            var timeout = $timeout(tick, 0);

            scope.$on('$destroy', function () {
                $timeout.cancel(timeout);
            });
        }
    };
}]);

