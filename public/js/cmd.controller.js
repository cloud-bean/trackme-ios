/**
 * Created by hygkui on 15/10/5.
 */

AppController.controller("cmdCtrl",
  function ($scope, User, Car, $ionicPopup, $ionicLoading, $timeout, msg, $state, Command) {
    $scope.msg = msg;
    $scope.carList = [];
    $scope.selectedOption = null;

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
      $scope.selectedOption = this.selectedOption;
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
      $scope.msg = "发送 设防指令中...";

      Command.sendCmd(User.getUsername(), $scope.selectedOption.devId,$scope.selectedOption.ipAddress, "set_defense").then(function(data){
        if(data === "ok"){
          $scope.msg = "成功执行 设防指令."
        }else{
          $scope.msg = "未能执行 设防指令.错误原因未知"
        }
      })
    };

    $scope.cancelDefense = function () {
      if (!validCar()) return null;
      $scope.msg = "发送 取消设防指令中...";
      Command.sendCmd(User.getUsername(), $scope.selectedOption.devId,$scope.selectedOption.ipAddress, "cancel_defense").then(function(data){
        if(data === "ok"){
          $scope.msg = "成功执行 取消设防指令."
        }else{
          $scope.msg = "未能执行 取消设防指令.错误原因未知"
        }
      })
    };

    $scope.setPowerSupply = function () {
      if (!validCar()) return null;
      $scope.msg = "发送设置掉电报警指令中...";
      Command.sendCmd(User.getUsername(), $scope.selectedOption.devId,$scope.selectedOption.ipAddress, "set_power_supply").then(function(data){
        if(data === "ok"){
          $scope.msg = "成功执行 设置掉电报警指令."
        }else{
          $scope.msg = "未能执行 设置掉电报警指令.错误原因未知"
        }
      })
    };

    $scope.cancelPowerSupply = function () {
      if (!validCar()) return null;
      $scope.msg = "发送取消掉电报警指令中...";
      Command.sendCmd(User.getUsername(), $scope.selectedOption.devId,$scope.selectedOption.ipAddress, "cancel_power_supply").then(function(data){
        if(data === "ok"){
          $scope.msg = "成功执行取消掉电报警指令."
        }else{
          $scope.msg = "未能执行 取消掉电报警指令.错误原因未知"
        }
      })
    };

  });