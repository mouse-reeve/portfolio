angular.module('app', [
    // services
    'floraService',

    // filters
    'formatNumberFilter',

    // clock filters
    'percentLifeElapsedFilter',
    'percentTimeElapsedFilter',
    'percentTimeLeftFilter',
    'reverseTimeFilter',
    'timeToBaseFilter',
    'timeToMovieFilter',
    'timeToNegativeBaseFilter',
    'timeToRomanFilter',

    // directives
    'flaskDirective',
    'shuffleDirective',
    'thesaurusDirective',
    'kippleizeDirective',

    'ngRoute'])

    .config(function ($routeProvider) {

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
            .when('/kipple', {
                templateUrl: 'static/partials/kipple.html'
            })
            .when('/flora', {
                controller: 'FloraCtrl',
                templateUrl: 'static/partials/flora.html'
            })
            .when('/resume', {
                controller: 'ResumeCtrl',
                templateUrl: 'static/partials/resume.html'
            })
            .when('/about', {
                templateUrl: 'static/partials/about.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
