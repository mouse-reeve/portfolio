angular.module('app', [
        'formatNumberFilter',

        // clock filters
        'reverseTimeFilter',
        'timeToBaseFilter',
        'timeToNegativeBaseFilter',
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
});

