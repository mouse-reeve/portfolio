angular.module('timeToBaseFilter', []).filter('timeToBase', function () {
    return function (input, radix, noDelimiter) {
        var numbers = input.split(':');
        for (var i=0; i<numbers.length; i++) {
            numbers[i] = (+numbers[i]).toString(radix);
            if (numbers[i].length < 2) {
                numbers[i] = '0' + numbers[i];
            }
        }
        if (noDelimiter) {
            return numbers.join('');
        }
        return numbers.join(':');
    };
});

