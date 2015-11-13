angular.module('app').controller('ActivityCtrl', [
        '$scope', 'Activity', function($scope, Activity) {
    Activity.getActivity().then(function (data) {
        $scope.activity = data;
    });
}]);
