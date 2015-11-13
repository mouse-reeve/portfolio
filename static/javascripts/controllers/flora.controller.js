angular.module('app').controller('FloraCtrl', [
        '$scope', 'Flora', function($scope, Flora) {
    $scope.names = [];

    var getFlora = function () {
        Flora.getName().then(function (flower) {
            $scope.names.push(flower);
        });
    };

    for (var i = 0; i < 5; i++) {
        getFlora();
    }
}]);
