function ClocksCtrl($scope, $timeout) {
    $scope.clock = Date.now();
    $scope.hour = new Date().getHours();
    $scope.tick = function() {
        $scope.clock = Date.now();
        $scope.hour = new Date().getHours();
        timeout = $timeout($scope.tick, 1000);
    }
    var timeout = $timeout($scope.tick, 1000);

    $scope.$on('$destroy', function() {
        $timeout.cancel(timeout);
    });
}

