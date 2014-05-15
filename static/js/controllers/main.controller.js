function MainCtrl($location, $scope, $http) {
    $scope.text = 'it\'s ok to be confused';
    $scope.pages = ['clocks', 'chomsky', 'thesaurus'];

    $scope.randomPage = function () {
        var page = Math.floor(Math.random()*$scope.pages.length);
        console.log(page);
        $location.path($scope.pages[page]);
    };
}

