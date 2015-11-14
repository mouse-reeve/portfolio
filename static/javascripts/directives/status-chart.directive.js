angular.module('statuschartDirective', []).directive('statuschart', [function () {
    return {
        restrict: 'E',
        scope: {
            data: '=?',
            showActivity: '=?',
            showCalendar: '=?'
        },
        link: function (scope) {
            scope.showCalendar = scope.showCalendar !== false ? true : false;
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
                        max = max < scope.days[day].count ? scope.days[day].count : max;
                    }

                    for (day in scope.days) {
                        scope.days[day].count = Math.ceil(scope.days[day].count / max * 10);
                    }
                }
            });
        },
        templateUrl: 'static/partials/directives/status-chart.html'
    };
}]);

