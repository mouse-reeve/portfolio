function MainCtrl($location, $scope, Activity) {
    $scope.text = 'it\'s ok to be confused';
    $scope.pages = ['clocks', 'chomsky', 'thesaurus', 'flora', 'activity', 'resume', 'about'];

    Activity.getActivity().then(function (data) {
        $scope.activity = data;
    });

    $scope.randomPage = function () {
        var page = Math.floor(Math.random() * $scope.pages.length);
        $location.path($scope.pages[page]);
    };
}

