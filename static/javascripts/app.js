angular.module('app', [
    // services
    'activityService',
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
    'statuschartDirective',

    'ngRoute'])

    .config(function ($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                title: 'Portfolio',
                controller: 'MainCtrl',
                templateUrl: 'static/partials/main.html'
            })
            .when('/clocks', {
                title: 'Clocks',
                controller: 'ClocksCtrl',
                templateUrl: 'static/partials/clocks.html'
            })
            .when('/chomsky', {
                title: 'Chomsky',
                templateUrl: 'static/partials/chomsky.html'
            })
            .when('/thesaurus', {
                title: 'Sense',
                templateUrl: 'static/partials/thesaurus.html'
            })
            .when('/kipple', {
                title: 'Kipple',
                templateUrl: 'static/partials/kipple.html'
            })
            .when('/flora', {
                title: 'Flora',
                controller: 'FloraCtrl',
                templateUrl: 'static/partials/flora.html'
            })
            .when('/activity', {
                title: 'Activity',
                controller: 'ActivityCtrl',
                templateUrl: 'static/partials/activity.html'
            })
            .when('/resume', {
                title: 'Resume',
                controller: 'ResumeCtrl',
                templateUrl: 'static/partials/resume.html'
            })
            .when('/about', {
                title: 'About',
                templateUrl: 'static/partials/about.html'
            })
            .otherwise({
                redirectTo: '/'
            })
        ;
    })
    .run(['$rootScope', '$route', function($rootScope, $route) {
        $rootScope.$on('$routeChangeSuccess', function() {
            document.title = $route.current.title + ' : Mouse Reeve';
        });
    }])
;
