function HoroscopeCtrl($scope, Horoscope) {
    $scope.load = function () {
        Horoscope.getHoroscope().then(function (data) {
            $scope.horoscope = data.horoscope;
        });
    };

    $scope.load();
}
