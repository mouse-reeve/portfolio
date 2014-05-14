angular.module('timeToRomanFilter', []).filter('timeToRoman', function() {
    return function (input) {
        var buckets = [[50, 'L'], [10, 'X'], [5, 'V'], [1, 'I']];
        var numbers = input.split(':');

        for (var i=0; i<numbers.length; i++) {
            var number = +numbers[i];
            var roman = '';
            if (number == 0) {
                numbers[i] = 'nulla';
            } else {
                for (var j=0; j<buckets.length; j++) {
                    var value = buckets[j][0];
                    var letter = buckets[j][1];
                    if (number >= value) {
                        roman += Array(Math.floor(number/value)+1).join(letter);
                        number -= value * (Math.floor(number/value));
                    }
                    if (!number) {
                        break;
                    }

                    if (number == value - 1) {
                        roman += 'I' + letter;
                        number -= (value - 1);
                    }
                }
                numbers[i] = roman;
            }
        };
        return numbers.join(':');
    };
})

