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

.controller('carCtrl', ['$scope', '$stateParams', 'TransData', 'Car', '$ionicPopup', function($scope, $stateParams, TransData, Car, $ionicPopup) {
    $scope.latitude = '';
    $scope.longitude = '';
    $scope.car = null;
    $scope.alarmList = [];

    Car.getAllCars().then(function(list) {
        $scope.car = list[$stateParams.id];

        TransData.listenOnPostion($scope.car.devId).then(function(pos) {
            if (pos.gprmc) {

                $scope.latitude = pos.gprmc.latitude;
                $scope.longitude = pos.gprmc.longitude;
            }
            console.log('get carId ' + $scope.car.devId + ' postion data is ' + $scope.latitude + $scope.longitude);
            $scope.showPosition();
        });
    });

    $scope.getAlarm = function() {
        $scope.alarmList.push({
            type: '0x64',
            msg: 'alarm-64',
            time: new Date()
        });
    }

    $scope.showPosition = function() {
        if ($scope.car.devId != '' && $scope.longitude != '' && $scope.latitude != '') {
            var mapObj = new AMap.Map($scope.car.devId);
            mapObj.setZoom(12);

            position = new AMap.LngLat($scope.longitude, $scope.latitude);
            mapObj.setCenter(position);

            var marker = new AMap.Marker({
                position: position, //基点位置                 
                //offset:new AMap.Pixel(-14,-14),//相对于基点的偏移位置                 
                icon: new AMap.Icon({ //复杂图标                 
                    size: new AMap.Size(21, 30), //图标大小                 
                    image: "img/map-marker.png", //大图地址                 
                    imageOffset: new AMap.Pixel(0, 0) //相对于大图的取图位置                 
                })
            });
            marker.setMap(mapObj);
        }
    };

    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            templateFromUrl: 'templates/time_span_popup.html',
            title: '查询起始时间',
            subTitle: '例：2013-11-02 12:34:01',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '<b>查询</b>',
                type: 'button-positive',
                onTap: function(e) {
                    if (!$scope.data.start_time && !$scope.data.end_time) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        return $scope.data;
                    }
                }
            }]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
            if (res) {
                $scope.start_time = formatAsSimple(res.start_time);
                $scope.end_time = formatAsSimple(res.end_time);
            }
        });
    };


    var formatAsSimple = function(datetimeObj) {
        if (datetimeObj && 'function' == typeof datetimeObj.getYear) { // 不空且是日期时间对象
            var spArr = datetimeObj.toJSON().split('T');
            return spArr[0] + " " + spArr[1].slice(0, 8);
        } else {
            return '';
        }
    }

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

.controller('SettingCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
