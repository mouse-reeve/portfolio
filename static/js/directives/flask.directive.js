angular.module('flaskDirective', []).directive([function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var text = element[0].childNodes[0].data;
            var words = text.split(' ');
            var flasked = '';
        }
    };
}]);

