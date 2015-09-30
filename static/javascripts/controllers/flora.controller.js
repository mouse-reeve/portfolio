function FloraCtrl($scope, Flora) {
    $scope.names = [];

    for (var i = 0; i < 5; i++) {
        Flora.getName().then(function (flower) {
            $scope.names.push(flower);
        });
    }
}
