angular.module('app', ['ngRoute', 'ngResource'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'static/partials/main.html'
        })
        .when('/clocks', {
            controller: 'ClocksCtrl',
            templateUrl: 'static/partials/clocks.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})

.factory('Thesaurus', function($resource, $q) {
    return {
        lookup: function(word) {
            return word;
        }
    };
})

.filter('formatNumber', function() {
    return function (input, decimals) {
        var dec = !!decimals && angular.isNumber(decimals) ? decimals : 0;
        if (!!input || input === 0) {
            return (String((+input).toFixed(dec))).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return '';
        }
    };
})

.filter('reverseTime', function() {
    return function (input) {
        return input.split('').reverse().join('');
    };
})

.filter('timeToBase', function() {
    return function (input, radix, noDelimiter) {
        var numbers = input.split(':');
        for (var i=0; i<numbers.length; i++) {
            numbers[i] = (+numbers[i]).toString(radix);
            if (numbers[i].length < 2) {
                numbers[i] = '0' + numbers[i];
            }
        }
        if (noDelimiter) {
            return numbers.join('');
        }
        return numbers.join(':');
    };
})

.filter('timeToRoman', function() {
    return function (input) {
        var buckets = [[50, 'L'], [10, 'X'], [5, 'V'], [1, 'I']];
        var numbers = input.split(':');

        for (var i=0; i<numbers.length; i++) {
            var number = +numbers[i];
            var roman = '';

            for (var j=0; j<buckets.length; j++) {
                var value = buckets[j][0];
                var letter = buckets[j][1];
                if (number >= value) {
                    roman += Array(Math.floor(number/value)+1).join(letter);
                    number -= value * (Math.floor(number/value));
                }
                if (!number) {
                    break;
                }
                if (number == value - 1) {
                    roman += 'I' + letter;
                    number -= (value - 1);
                }
            }
            numbers[i] = roman;
        };
        return numbers.join(':');
    };
})

.controller('MainCtrl', function($scope) {
    $scope.text = 'it\'s ok to be confused';
})

.controller('ClocksCtrl', function($scope, $timeout) {
    $scope.clock = Date.now();
    $scope.tick = function() {
        $scope.clock = Date.now();
        timeout = $timeout($scope.tick,1000);
    }
    var timeout = $timeout($scope.tick, 1000);
});

