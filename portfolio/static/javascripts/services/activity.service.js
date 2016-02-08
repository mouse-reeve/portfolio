angular.module('activityService', []).service('Activity', function ($http) {
    return {
        getActivity: function () {
            return $http.get('/api/activity').then(function (response) {
                return response.data;
            });
        }
    };
});

