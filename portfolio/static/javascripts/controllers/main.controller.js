angular.module('app').controller('MainCtrl', [
        '$location', '$scope', 'Activity', function($location, $scope, Activity) {

    $scope.text = 'it\'s ok to be confused';
    $scope.pages = [
        {link: 'clocks', display: 'clocks'},
        {link: 'chomsky', display: 'chomp'},
        {link: 'thesaurus', display: 'sense'},
        {link: 'flora', display: 'flora'},
        {link: 'kipple', display: 'kipple'},
        {link: 'activity', display: 'activity'},
        {link: 'resume', display: 'résumé'},
        {link: 'about', display: 'about'}
    ];

    Activity.getActivity().then(function (data) {
        $scope.activity = data;
    });

    $scope.randomPage = function () {
        var page = Math.floor(Math.random() * $scope.pages.length);
        $location.path($scope.pages[page].link);
    };
}]);
