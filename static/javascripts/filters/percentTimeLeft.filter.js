angular.module('percentTimeLeftFilter', []).filter('percentTimeLeft', function () {
    return function (input) {
        var seconds = 24 * 60 * 60;
        var times = input.split(':');
        var left = seconds - (parseInt(times[0]) * 60 * 60) + (parseInt(times[1]) * 60) + parseInt(times[2]);
        return Math.round(left/seconds * 100 * 1000) / 1000;
    };
});


