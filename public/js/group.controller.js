AppController.controller('CarGroupCtrl',
  ["$scope", "$q", "CarGroup", "Car", "User", "$state",
    "$ionicLoading", "username",
  function ($scope, $q, CarGroup, Car, User, $state,
            $ionicLoading, username) {
    $scope.groups = [];
    $scope.cars = [];
    $scope.username = username;

    var promiseGroup = CarGroup.getGroupList(username)
      .then(function (groupList) {
        $scope.groups = groupList;
      });

    var promiseCar = Car.getAllCars(username)
      .then(function (carsList) {
        $scope.cars = carsList;
      });

    var init = function () {
      $ionicLoading.show({
        template: 'loading data ...'
      });

      $q.all([promiseGroup, promiseCar]).then(function () {
        $ionicLoading.hide();
      }).catch(function (err) {
        console.log('err in get cars and groups ', err);
        $ionicLoading.hide();
      });
    };

    if ($scope.username.length === 0) {
      $state.go('tab.dash');
    } else {
      init();
    }

    // TODO: wrong with here
    $scope.doRefresh = function () {
      console.log("start to update device..");

      $q.all([promiseGroup, promiseCar])
        .finally(function () {
          console.log("end to update device..");
          $scope.$broadcast('scroll.refreshComplete')
        })
    };

  }]);
