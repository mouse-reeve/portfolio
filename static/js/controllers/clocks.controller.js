function ClocksCtrl($scope, $timeout) {
    $scope.clock = Date.now();
    $scope.tick = function() {
        $scope.clock = Date.now();
        timeout = $timeout($scope.tick, 1000);
    }
    var timeout = $timeout($scope.tick, 1000);
}

