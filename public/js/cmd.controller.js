/**
 * Created by hygkui on 15/10/5.
 */

AppController.controller("cmdCtrl",
  function ($scope, User, Car, $ionicPopup, $ionicLoading, $timeout, msg, $state) {
    $scope.msg = msg;
    $scope.carList = [];
    $scope.selectedOption = '';

    var init = function () {
      var username = "";
      username = User.getUsername() ;
      if(username.length === 0){
        $state.go('tab.dash');
      }

      $ionicLoading.show('Loading cars ...');
      Car.getAllCars(username)
        .then(function (carList) {
          $scope.carList = carList;
        }).finally(function () {
          $ionicLoading.hide();
        });
    };

    init();

    $scope.clearMsg = function () {
      $scope.msg = '';
    };

    $scope.selectAction = function(){
      console.log(this.selectedOption);
      $scope.selectedOption = this.selectedOption ;
    };

    var validCar = function () {
      if(!$scope.selectedOption) {
        var alertP = $ionicPopup.alert({
          title: '警告',
          template: '请选择要发送的设备' + $scope.selectedOption,
          okText: '明白，好的'
        });
        alertP.then(function (res) {
          return false;
        });
      } else {
        return true;
      }
    };

    $scope.setDefense = function () {
      if (!validCar()) return null;
      $scope.msg = "发送设防指令中...";
      $timeout(function () {
        $scope.msg = "成功执行设防指令."
      }, 2000);
    };

    $scope.cancelDefense = function () {
      if (!validCar()) return null;
      $scope.msg = "发送取消设防指令中...";
      $timeout(function () {
        $scope.msg = "成功取消设防指令."
      }, 2000);
    };

    $scope.setPowerSupply = function () {
      if (!validCar()) return null;
      $scope.msg = "发送设置掉电报警指令中...";
      $timeout(function () {
        $scope.msg = "成功设置掉电报警."
      }, 2000);
    };

    $scope.cancelPowerSupply = function () {
      if (!validCar()) return null;
      $scope.msg = "发送取消掉电报警指令中...";
      $timeout(function () {
        $scope.msg = "成功取消掉电报警."
      }, 2000);
    };

  });