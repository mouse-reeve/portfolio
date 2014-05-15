function MainCtrl($location, $scope, $http) {
    $scope.text = 'it\'s ok to be confused';
    $scope.pages = ['clocks', 'chomsky', 'thesaurus'];

    $scope.randomPage = function () {
        var page = Math.floor(Math.random()*$scope.pages.length);
        console.log(page);
        $location.path($scope.pages[page]);
    };

    $scope.test = [];
    $scope.runThesaurus = function (word) {
        var apiKey = '78905c957664c4ec0b57625596af9037';
        $http.get('http://words.bighugelabs.com/api/2/' + apiKey + '/' + word + '/json').then(function (data) {
            console.log(data);
        });
    };

    $scope.runThesaurus('fish');

}

