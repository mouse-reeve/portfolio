/**
  According to http://gosset.wharton.upenn.edu/~foster/mortality/perl/mainform.pl, my life
  expectancy is 92.37
*/
angular.module('percentLifeElapsedFilter', []).filter('percentLifeElapsed', function () {
    return function (now) {
        var birth = new Date("Thu Feb 8 1990 03:00:00 GMT-0800 (PST)");
        var death = new Date("Mon Jun 22 2082 13:00:00 GMT-0700 (PDT)");

        var elapsed = (now - birth) / (death - birth) * 100;
        return Math.round(elapsed * 10000000) / 10000000;
    };
});

