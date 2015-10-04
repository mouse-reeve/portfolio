angular.module('horoscopeService', []).service('Horoscope', function ($http) {
    return {
        getHoroscope: function () {
            return $http.get('/api/horoscope').then(function (response) {
                return response.data;
            });
        }
    };
});
