



AppController.controller('DashCtrl', function($scope, Talker, $ionicLoading) {

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
});
