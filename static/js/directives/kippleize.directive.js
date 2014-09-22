angular.module('kippleizeDirective', []).directive('kippleize', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            startPoints: '@'
        },
        link: function (scope, element, attrs) {
            var text = element[0].childNodes[0].data;
            var lines = text.split('\n');
            var original = angular.copy(lines);

            var replacement = '*';
            var promises = [];
            
            var iteration = function() {
                console.log('tick');
                letters = lines[this.line].split('');
                letters[this.letter] = replacement;
                lines[this.line] = letters.join('');

                element[0].childNodes[0].data = lines.join('\n');

                var directions = [
                    {
                        north: {line: this.line + 1, letter: this.letter},
                        south: {line: this.line - 1, letter: this.letter}
                    }, {
                        east: {line: this.line, letter: this.letter + 1},
                        west: {line: this.line, letter: this.letter - 1}
                    }
                ];

                var toggle = Math.round(Math.random());
                var randomizer = Math.floor(Math.random() * 500);

                angular.forEach(directions[toggle], function (direction, index) {
                    if (direction.line in lines &&
                            direction.letter in lines[direction.line].split('') &&
                            lines[direction.line].split('')[direction.letter] !== replacement) {
                        var promise = $timeout(iteration.bind({line: direction.line, letter: direction.letter}), 750+randomizer);
                        promises.push(promise);
                    }
                });

                var isolated = true;
                angular.forEach(directions[1-toggle], function (direction, index) {
                    if (direction.line in lines &&
                            direction.letter in lines[direction.line].split('') &&
                            lines[direction.line].split('')[direction.letter] !== replacement) {
                        isolated = false;
                    }
                });

                if (!isolated) {
                    var promise = $timeout(iteration.bind({line: this.line, letter: this.letter}), 750+randomizer);
                    promises.push(promise);
                }
            };

            for (var i=0; i<scope.startPoints; i++) {
                var startLine = Math.floor(Math.random() * lines.length);
                var startLetter = Math.floor(Math.random() * lines[startLine].length);

                var timeout = $timeout(iteration.bind({line: startLine, letter: startLetter}), 1000*(2*(i+1)));
                promises.push(timeout);
            }

            scope.$on('$destroy', function() {
                for (var i=0; i<promises.length; i++) {
                    $timeout.cancel(promises[i]);
                }
            });
        }
    };
}]);

