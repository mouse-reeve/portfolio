angular.module('timeToMovieFilter', []).filter('timeToMovie', function () {
    return function (input, duration) {
        var times = input.split(':');
        var elapsed = (parseInt(times[0]) * 60 * 60) + (parseInt(times[1]) * 60) + parseInt(times[2]);
        var movie = duration * 60;
        return Math.round(elapsed/movie*1000)/1000;
    };
});


