function ActivityCtrl($scope, Activity) {
    Activity.getActivity().then(function (data) {
        $scope.activity = data;
    });
}
