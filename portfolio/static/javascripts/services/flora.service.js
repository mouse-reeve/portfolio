angular.module('floraService', []).service('Flora', function ($http) {

    return {
        getName: function () {
            return $http.get('/api/flora').then(function (response) {
                return response.data;
            });
        }
    };
});
