function FloraCtrl($scope, Flora) {
    // hackily recreates the python WordBuilder repo and the NominaFlora data
    $scope.names = [];

    for (var i = 0; i < 5; i++) {
        var flower = {'genus': Flora.getGenus(), 'species': Flora.getSpecies(), 'common': Flora.getCommon()};
        $scope.names.push(flower);
    }
}
