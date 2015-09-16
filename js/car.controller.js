AppController.controller('carCtrl', ['$scope', '$stateParams', 'TransData', 'Car', '$ionicPopup', function($scope, $stateParams, TransData, Car, $ionicPopup) {
    $scope.latitude = '';
    $scope.longitude = '';
    $scope.car = null;
    $scope.alarmList = [];
    $scope.devInfo = null;
    $scope.pointArr = []; // 轨迹点集合
    $scope.aMap = null;
    $scope.carCamerMarker = null;
    $scope.isShowCtrlBtn = true;
    $scope.locateMarker = null;

    Car.getAllCars().then(function(list) {
        $scope.car = list[$stateParams.id];

        TransData.listenOnPostion($scope.car.devId).then(function(pos) {
            $scope.devInfo = pos;
            if (pos.gprmc) {

                $scope.latitude = pos.gprmc.latitude;
                $scope.longitude = pos.gprmc.longitude;
            }
            console.log('get carId ' + $scope.car.devId + ' postion data is ' + $scope.latitude + $scope.longitude);
            $scope.showPosition();
        });
    })

    // get the points and push to $scope.pointArr
    var getPointArr = function(carid, sdate, edate) {
        // a service to get the Arr, as a promise
        TransData.getTrackList(carid, sdate, edate).then(function(TrackListArr) {
                console.log(TrackListArr);
                if (TrackListArr.length > 0) { // 判读是否有数据列表
                    $scope.pointArr = TrackListArr;

                    // 移除定位的标记
                    $scope.locateMarker.setMap(null);

                } else {
                    // todo: 退出promise链
                }
            })
            .then(markAll($scope.aMap, $scope.pointArr))
            .then(drawPloyline($scope.aMap, $scope.pointArr))
            .then(initCarCamerMarker())
            .then(showCtrlButtons());
    }

    // show the points on the map
    var markAll = function(map, positionArr) {
        for (var i = positionArr.length - 1; i >= 0; i--) {
            var pos = positionArr[i];
            var mk3 = new AMap.Marker({
                map: map,
                position: [latitude.latitude, latitude.longitude],
                icon: "http://webapi.amap.com/images/marker_sprite.png",
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true
            });
        };


    }

    var initCarCamerMarker = function() {
        if ($scope.carCamerMarker) $scope.carCamerMarker = null;
        var startPosition = $scope.pointArr[0];
        $scope.carCamerMarker = new AMap.Marker({
            map: map,
            position: [startPosition.latitude, startPosition.longitude],
            icon: "http://code.mapabc.com/images/car_03.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true
        });
    }

    var drawPloyline = function(map, lineArr) {
        // 绘制轨迹
        var polyline = new AMap.Polyline({
            map: map,
            path: lineArr,
            strokeColor: "#00A", //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线宽
            strokeStyle: "dashed" //线样式
        });
        map.setFitView();
    }

    function startAnimation() {
        $scope.carCamerMarker.moveAlong($scope.pointArr, 1500);
    }

    function stopAnimation() {
        $scope.carCamerMarker.stopMove();
        initCarCamerMarker();
    }

    $scope.showCtrlButtons = function() {
        $scope.isShowCtrlBtn = true;
    }

    $scope.getAlarm = function() {
        $scope.alarmList.push({
            type: '0x64',
            msg: 'alarm-64',
            time: new Date()
        });
    }

    $scope.showPosition = function() {
        if ($scope.car.devId != '' && $scope.longitude != '' && $scope.latitude != '') {

            $scope.aMap = $scope.aMap ? $scope.aMap : new AMap.Map($scope.car.devId);
            $scope.aMap.setZoom(12);

            position = new AMap.LngLat($scope.longitude, $scope.latitude);
            $scope.aMap.setCenter(position);

            var marker = new AMap.Marker({
                position: position, //基点位置                 
                //offset:new AMap.Pixel(-14,-14),//相对于基点的偏移位置                 
                icon: new AMap.Icon({ //复杂图标                 
                    size: new AMap.Size(21, 30), //图标大小                 
                    image: "img/map-marker.png", //大图地址                 
                    imageOffset: new AMap.Pixel(0, 0) //相对于大图的取图位置                 
                })
            });
            marker.setMap($scope.aMap);
            $scope.locateMarker = marker;
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

    $scope.showDevInfoPopup = function() {
        var myPopup = $ionicPopup.show({
            templateFromUrl: 'templates/dev_info.html',
            title: '设备信息',
            scope: $scope,
            buttons: [{
                type: 'button-positive',
                text: '关闭'
            }]
        });
    }


    var formatAsSimple = function(datetimeObj) {
        if (datetimeObj && 'function' == typeof datetimeObj.getYear) { // 不空且是日期时间对象
            var spArr = datetimeObj.toJSON().split('T');
            return spArr[0] + " " + spArr[1].slice(0, 8);
        } else {
            return '';
        }
    }

}]);
