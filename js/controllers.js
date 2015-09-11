angular.module('starter.controllers', [])

.controller('CarGroupCtrl', ['$scope', '$q', 'CarGroup', 'Car', '$ionicLoading', function($scope, $q, CarGroup, Car, loading) {
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

}])

.controller('carCtrl', ['$scope', '$stateParams', 'TransData', 'Car', function($scope, $stateParams, TransData, Car) {

    $scope.latitude = '';
    $scope.longitude = '';
    $scope.devid = '';
    $scope.car = null;
    Car.getAllCars().then(function(list) {
        $scope.car = list[$stateParams.id];

        TransData.listenOnPostion($scope.car.devId).then(function(pos) {
            if (pos.gprmc) {

                $scope.latitude = pos.gprmc.latitude;
                $scope.longitude = pos.gprmc.longitude;
            }
            console.log('get carId ' + $scope.car.devId + ' postion data is ' + $scope.latitude + $scope.longitude);
        });
    });


}])

.controller('DashCtrl', function($scope, Talker, $ionicLoading) {

    $scope.login = function() {
        var username = (this.username + "").trim();
        var password = (this.password + "").trim();
       
        $ionicLoading.show({
            noBackdrop: true,
            template: '<ion-spinner class="spinner-energized"></ion-spinner><br/>登录中...'
        });

        Talker.login(username, password).then(function(data) {
            // todo: get the data, show on the page.
            console.log("登录成功");
            $ionicLoading.hide();
        }, function(err) {
            console.log(err);
            $ionicLoading.hide();
        });
    }

})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
