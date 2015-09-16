
AppController.controller('CarGroupCtrl', ['$scope', '$q', 'CarGroup', 'Car', '$ionicLoading', function($scope, $q, CarGroup, Car, loading) {
    $scope.groups = [];
    $scope.cars = [];

    loading.show({
        template: "loading"
    });

    var promiseGroup = CarGroup.getGroupList().then(function(groupList) {
        $scope.groups = groupList;
    });

    var promiseCar = Car.getAllCars().then(function(carsList) {
        $scope.cars = carsList;
    });

    $q.all([promiseGroup, promiseCar]).then(function() {
        loading.hide();
    });

}]);
