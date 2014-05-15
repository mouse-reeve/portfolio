angular.module('shuffleDirective', []).directive('shuffle', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var text = element[0].childNodes[0].data;
            var words = text.split(' ');
            var ticks = 1;
            var tick = function() {
                ticks += 0.2;
                var random = Math.floor(Math.random()*words.length-2);
                var temp = words[random];
                words[random] = words[random+1];
                words[random+1] = temp;
                element[0].childNodes[0].data = words.join(' ');

                var delay = Math.ceil(10000/ticks);
                timeout = $timeout(tick, Math.floor(Math.random()*delay));
            }
            var timeout = $timeout(tick, 5000);

            scope.$on('$destroy', function() {
                $timeout.cancel(timeout);
            });
        }
    };
}]);

