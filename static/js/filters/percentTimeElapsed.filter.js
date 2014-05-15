angular.module('percentTimeElapsedFilter', []).filter('percentTimeElapsed', function() {
    return function (input) {
        var seconds = 24 * 60 * 60;
        var times = input.split(':');
        var elapsed = (parseInt(times[0]) * 60 * 60) + (parseInt(times[1]) * 60) + parseInt(times[2]);
        return Math.round(elapsed/seconds * 100 * 1000)/1000;
    };
})


