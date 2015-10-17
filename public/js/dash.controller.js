AppController.controller('DashCtrl',
  ["$scope", "Talker", "TransData", "User", "store",
  "$ionicLoading", "$timeout",
  function ($scope, Talker, TransData, User, store,
            $ionicLoading,
            $timeout) {
    $scope.username = "";
    $scope.password = "";
    $scope.isAuthed = false; // if user is login success, show the main menu.
    $scope.isSaved = (store.getSaveConfig() === "true") ? true : false; // if or not save the client's account.

    $scope.clearSave = function () {
      $scope.isSaved = false;
      store.setSavedFalse();
      store.put("username", "");
      store.put("password", "");
    };

    if (store.getSaveConfig()) {
      $scope.username = store.get("username");
      $scope.password = store.get("password");
    }

    $scope.show = function (str) {
      $ionicLoading.show({
        template: str
      });
    };

    $scope.hide = function () {
      $ionicLoading.hide();
    };

    $scope.toggleSaved = function () {
      $scope.isSaved = !$scope.isSaved;

      if ($scope.isSaved) {
        store.setSavedTrue();
        store.put("username", this.username);
        store.put("password", this.password);
      } else {
        store.setSavedFalse();
        store.put("username", "");
        store.put("password", "");
      }

    };

    $scope.login = function () {
      $scope.show('正在登陆...');

      var username = (this.username + "").trim();
      var password = (this.password + "").trim();

      User.setUsername(username);

      Talker.login(username, password)
       .then(function(ref){
         return TransData.getLoginResult(ref);
       }, function(err){
         $scope.show('ref err...' + err);
       }).then(function (userLoginInfo) {
         console.log(userLoginInfo);
          $scope.isAuthed = (userLoginInfo.isLogin + "" === "1");
          User.setLoginState($scope.isAuthed);

          if ($scope.isAuthed) {
            $scope.show('登陆成功！');
            $timeout(function () {
              $scope.hide();
            }, 300);
          } else {
            $scope.show('账号或密码错，请重试！');
            $timeout(function () {
              $scope.hide();
            }, 1000);
          }

        });
    };

    // logout, if set not to save the account info
    // clear the form data. set auth state to false.
    $scope.logout = function () {
      var name = $scope.username;
      Talker.logout(name).then(function(msg){
        console.log("logout msg: ", msg);
      });
      $scope.isAuthed = false;
      User.setLoginState(false);
      User.setUsername("");
      if (!$scope.isSaved) {
        $scope.username = "";
        $scope.password = "";
      }
    };

  }]);
