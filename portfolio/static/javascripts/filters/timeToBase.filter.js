angular.module('timeToBaseFilter', []).filter('timeToBase', function () {
    return function (input, radix, noDelimiter) {
        var numbers = input.split(':');
        for (var i=0; i<numbers.length; i++) {
            numbers[i] = (+numbers[i]).toString(radix);
            if (numbers[i].length < 2) {
                numbers[i] = '0' + numbers[i];
            }
        }
        return noDelimiter ? numbers.join('') : numbers.join(':');
    };
});

