function MainCtrl($location, $scope, $http) {
    $scope.text = 'it\'s ok to be confused';
    $scope.pages = ['clocks', 'chomsky', 'thesaurus', 'resume'];

    $scope.randomPage = function () {
        var page = Math.floor(Math.random()*$scope.pages.length);
        $location.path($scope.pages[page]);
    };
}

