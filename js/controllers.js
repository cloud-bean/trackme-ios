angular.module('starter.controllers', [])

.controller('CarGroupCtrl', ['$scope', 'CarGroup', function($scope, CarGroup){
  $scope.hi = "world";
  $scope.groups = [];

  var getGroups = function (data) {
    console.log(JSON.stringify(data));
    $scope.groups = data;
  }

  CarGroup.getAll(getGroups);

  $scope.remove = function (gId) {
    console.log("removeing " + gId);
  }
}])

.controller('DashCtrl', function($scope, $http, Talker, TransData, $ionicLoading, $ionicPopup, $timeout) {

    console.log("heolo,world.");

    $scope.loginMsg = 'loginMsg test';
    $scope.currentPosition = 'currentPos test';
    $scope.carId = '66666666600';
    $scope.getPosition = function() {
        // get the carId
        // get the wilddog service to listen on carId's position changes
        // if changes, alert the values.
        var carId = this.carId;
        TransData.listenOnPostion(carId, function(pos) {
            console.log('get carId ' + carId + ' postion data is ' + JSON.stringify(pos));
            var latitude = pos.gprmc.latitude + "";
            var longitude = pos.gprmc.longitude + "";

            // todo: there is an error.
            $scope.currentPosition = latitude + ';' + longitude + "";


            // show the map
            var position = new AMap.LngLat(longitude, latitude);
            // var position=new AMap.LngLat(parseFloat(longitude), parseFloat(latitude));
            //var position=new AMap.LngLat(116.397428,39.90923);

            var mapObj = new AMap.Map("map_container", {
                view: new AMap.View2D({ //创建地图二维视口
                    center: position, //创建中心点坐标
                    zoom: 14, //设置地图缩放级别
                    rotation: 0 //设置地图旋转角度
                }),
                lang: "zh_cn" //设置地图语言类型，默认：中文简体
            });

            var marker = new AMap.Marker({
                position: position, //基点位置                 
                //offset:new AMap.Pixel(-14,-14),//相对于基点的偏移位置                 
                icon: new AMap.Icon({ //复杂图标                 
                    size: new AMap.Size(21, 30), //图标大小                 
                    image: "../img/map-marker.png", //大图地址                 
                    imageOffset: new AMap.Pixel(0, 0) //相对于大图的取图位置                 
                })
            });
            marker.setMap(mapObj);

        });
    }

    $scope.login = function() {
        var username = (this.username + "").trim();
        var password = (this.password + "").trim();
        var callback = function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        }

        $ionicLoading.show({
            noBackdrop: true,
            template: '<ion-spinner icon="line" class="spinner-energized"></ion-spinner><br/>登录中...'
        });
        Talker.login(username, password).then(function(data) {
            // todo: get the data, show on the page.
            console.log(data);

        }, function(err) {
            // err ...
            console.log(err);
            $ionicLoading.hide();
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
