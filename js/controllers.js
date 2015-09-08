angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, Talker) {

    console.log("heolo,world.");

    $scope.loginMsg = 'loginMsg test';
    $scope.currentPosition = 'currentPos test';

    $scope.getPosition = function() {
        $scope.currentPosition = 'not worked.';
    }

    $scope.login = function() {
        var username = (this.username + "").trim();
        var password = (this.password + "").trim();
        var callback = function(err, data){
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        }
        Talker.login(username, password).then(function(data){
          // todo: get the data, show on the page.
          console.log(data);
        }, function(err) {
          // err ...
          console.log(err);
        });
    }

})

.controller('ChatsCtrl', function($scope) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = [];
    $scope.remove = function(chat) {
        return null;
    };
})


.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
