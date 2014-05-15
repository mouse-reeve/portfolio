angular.module('timeToNegativeBaseFilter', []).filter('timeToNegativeBase', function() {
    return function (input, radix, noDelimiter) {
        radix = -radix;
        var numbers = input.split(':');
        for (var i=0; i<numbers.length; i++) {
            var number = numbers[i];
            var result = 0;

            while (number != 0) {
                var exp = number > 0 ? 0 : 1;
                var sum = 0;
                while (Math.abs(sum) < Math.abs(number)) {
                    sum += (-radix-1) * Math.pow(radix, exp);
                    exp += 2;
                }
                exp -= 2;
                var digit = Math.floor(number/Math.pow(radix, exp));
                digit = digit ? digit : 1;

                number -= digit * Math.pow(radix, exp);
                result += digit * Math.pow(10, exp);
            }
            numbers[i] = result;
        }
        return numbers.join(':');
                
    };
})

