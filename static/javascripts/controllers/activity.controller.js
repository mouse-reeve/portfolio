function ActivityCtrl($scope, Activity) {
    for (var i = 0; i < 5; i++) {
        Activity.getActivity().then(function (data) {
            $scope.activity = data;
        });
    }
}
