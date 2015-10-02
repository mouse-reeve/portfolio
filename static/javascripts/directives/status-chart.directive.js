angular.module('statuschartDirective', []).directive('statuschart', [function () {
    return {
        restrict: 'E',
        scope: {
            data: '=?'
        },
        link: function (scope) {
            scope.filterValue = null;

            scope.range = function (num) {
                return new Array(num) || [0];
            };

            scope.setFilter = function (date) {
                scope.filterValue = date;
            };

            scope.$watch('data', function (data) {
                if (data && 'stats' in data) {
                    scope.activity = data.activity;
                    scope.days = data.stats.days;
                    var date = new Date();
                    scope.filterValue = date.toISOString().substring(0, 10);

                    var max = 0;
                    for (var day in scope.days) {
                        max = max < scope.days[day] ? scope.days[day] : max;
                    }

                    for (day in scope.days) {
                        scope.days[day] = Math.ceil(scope.days[day] / max * 10);
                    }
                }
            });
        },
        templateUrl: 'static/partials/directives/status-chart.html'
    };
}]);

