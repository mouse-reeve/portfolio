angular.module('app', ['ngRoute', 'ngResource'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'static/partials/main.html'
        })
        .when('/clocks', {
            controller: 'ClocksCtrl',
            templateUrl: 'static/partials/time.html'
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

.filter('capitalize', function() {
    return function(input) {
        if (!input) {
            return '';
        }
        return input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
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

.controller('MainCtrl', function($scope) {
    console.log('hi');
    $scope.test = 'hi';

});

