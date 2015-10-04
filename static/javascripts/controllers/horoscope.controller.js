function HoroscopeCtrl($scope, Horoscope) {
    Horoscope.getHoroscope().then(function (data) {
        $scope.horoscope = data.horoscope;
    });
}
