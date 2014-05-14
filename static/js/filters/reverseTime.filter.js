angular.module('reverseTimeFilter', []).filter('reverseTime', function() {
    return function (input) {
        return input.split('').reverse().join('');
    };
});

