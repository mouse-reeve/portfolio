angular.module('formatNumberFilter', []).filter('formatNumber', function () {
    return function (input, decimals) {
        var dec = !!decimals && angular.isNumber(decimals) ? decimals : 0;
        if (!!input || input === 0) {
            return (String((+input).toFixed(dec))).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return '';
    };
});
