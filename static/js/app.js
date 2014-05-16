angular.module('app', [
        'formatNumberFilter',

        // clock filters
        'percentTimeElapsedFilter',
        'percentTimeLeftFilter',
        'reverseTimeFilter',
        'timeToBaseFilter',
        'timeToMovieFilter',
        'timeToNegativeBaseFilter',
        'timeToRomanFilter',

        // directives
        'shuffleDirective',
        'thesaurusDirective',

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
        .when('/chomsky', {
            templateUrl: 'static/partials/chomsky.html'
        })
        .when('/thesaurus', {
            templateUrl: 'static/partials/thesaurus.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.run(function($http) {
    $http.defaults.useXDomain = true;
})