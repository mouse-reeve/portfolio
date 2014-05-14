angular.module('app', [
        'formatNumberFilter',

        // clock filters
        'reverseTimeFilter',
        'timeToBaseFilter',
        'timeToRomanFilter',

        'ngRoute'])

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

.controller('MainCtrl', function($scope) {
    $scope.text = 'it\'s ok to be confused';
})

.controller('ClocksCtrl', function($scope, $timeout) {
    $scope.clock = Date.now();
    $scope.tick = function() {
        $scope.clock = Date.now();
        timeout = $timeout($scope.tick, 1000);
    }
    var timeout = $timeout($scope.tick, 1000);
});

