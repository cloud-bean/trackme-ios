AppController.controller('alarmCtrl',
  ["$scope", "WilddogNotifyBaseURL", "$ionicLoading", "$state", "User", "Car",
  function ($scope, WilddogNotifyBaseURL, $ionicLoading, $state, User, Car) {
    $scope.alarmList = [];
    $scope.carList = [];

    if ((User.getUsername()).length === 0) {
      $state.go('tab.dash');
    }

    var refString = User.getUsername() + "/" + "alarm/";
    var alarmListRef = new Wilddog(WilddogNotifyBaseURL + refString);

    var init = function () {
      $ionicLoading.show({
          template: 'loading data...'
        }
      );
      
      Car.getAllCars(User.getUsername())
        .then(function(data){
        $scope.carList = data;
      
        alarmListRef.on("value", function (snapshot) {
          $scope.alarmList = snapshot.val();
          console.log($scope.alarmList);
          try {
            $scope.$digest();
          } catch (e){

          }
          $ionicLoading.hide();
        });
      }).finally(function(){
        $ionicLoading.hide();
      });
    };
    
    init();

    $scope.getCarName = function (devid) {
      console.log('get Car name by devid: ', devid);

      var tid = devid;
      var name = 'unTitled';
      // 历史遗留问题   see[3d4b74](https://github.com/xinnix/Trackme/commit/3d4b748172c362f5170d2f3d153f82357cda16ae)
      if (devid.indexOf("f") > 0) {
        tid = devid.substring(0, devid.indexOf("f"));
      }

      angular.forEach($scope.carList, function (car) {
        if (car.devId + "" === tid + "") {
          name = car.name;
        }
      });

      return name;
    }
  }]);
