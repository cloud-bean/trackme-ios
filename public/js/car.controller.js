AppController.controller('carCtrl',
  ["$scope", "Car", "User", "TransData",
    "Talker", "$ionicPopup", "$ionicLoading",
    "$q", "$stateParams", "$timeout",
  function ($scope, Car, User, TransData,
            Talker, $ionicPopup, $ionicLoading,
            $q, $stateParams, $timeout) {
    $scope.latitude = '';
    $scope.longitude = '';
    $scope.devInfo = null;
    $scope.pointArr = []; // 轨迹点集合
    $scope.aMap = new AMap.Map("car_map");
    $scope.carCamerMarker = null;
    $scope.isShowCtrlBtn = false;
    $scope.locateMarker = null;
    $scope.animationLine = [];
    $scope.carState = null;
    $scope.address = "地址解析中...";
    $scope.trackRef = "";
    $scope.polyline = null;


    $ionicLoading.show({
      template: "loading..."
    });

    Car.getAllCars(User.getUsername())
      .then(function (carList) {
        var carObj = null;
        angular.forEach(carList, function (v, k) {
          if (k + "" === $stateParams.id + "") {
            carObj = v;
          }
        });
        $ionicLoading.show({
          template: "正在获取设备的最新状态..."
        });
        $scope.car = carObj;
        return carObj;
      })
      .then(function (car) {
        return TransData.listenOnPosition(car.devId)
      })
      .then(function (pos) {
        $ionicLoading.show({
          template: "parse data..."
        });

        // save the car state
        $scope.carState = pos;

        $scope.latitude = pos.lat;
        $scope.longitude = pos.lon;

        getAddressByPos($scope.latitude,  $scope.longitude, function(data){
          try {
            $scope.address = data.regeocode.formattedAddress;
            console.log("lnglatXY address is ", $scope.address );

            $scope.$digest();
          } catch(e){

          }
        });

        $scope.showPosition();
        $ionicLoading.hide();
      })
      .finally(function () {
        $ionicLoading.hide();
      });

      var getAddressByPos = function(lat, lng, geocoder_CallBack){
        var lnglatXY = [lng, lat];
        
        var MGeocoder;
        //加载地理编码插件
        AMap.service(["AMap.Geocoder"], function() {
            MGeocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });
        });
    };

    // get the points and push to $scope.pointArr
    var getPointArr = function (username, carid, sdate, edate, spanHour) {
      Talker.sendRequestTrackList(username, carid, sdate, edate)
        .then(function(ref) {
          // Wait for 10 more seconds, then the trans-server will
          // have the time to put the data on Wilddog.
          $scope.trackRef = ref;
        });

      $ionicLoading.show({
        template: '查询轨迹历史中...<br/>' + '总计需要' + spanHour + "秒"
      });

      $timeout(function(){
        $ionicLoading.hide();
        TransData.getTrackList($scope.trackRef).then(function (TrackListArr) {
          console.log("TrackListArr", TrackListArr);
          if (TrackListArr.length > 0) { // 判读是否有数据列表
            $scope.pointArr = TrackListArr;

            // 移除定位的标记
            if ($scope.locateMarker != null){
              $scope.locateMarker.setMap(null);
            }

            //  $scope.aMap.setCenter($scope.pointArr[0].latitude, $scope.pointArr[0].longitude);
            markAll($scope.aMap, $scope.pointArr);
            drawPloyline($scope.aMap, trackListToLineArr($scope.pointArr));
            initCarCamerMarker($scope.aMap);
            $scope.showCtrlButtons()
          } else {
            $ionicLoading.show({
              template: "无数据或数据量太多，请注意选择时间段"
            });
            $timeout(function () {
              $ionicLoading.hide();
            }, 1200);
          }
        });
      }, spanHour * 800);
    };

    // show the points on the map
    var markAll = function (map, positionArr) {
      for (var i = positionArr.length - 1; i >= 0; i--) {
        var pos = positionArr[i];
        // console.log("positionArr[" + i + "] ", pos);
        var mk3 = new AMap.Marker({
          map: map,
          position: [pos.longitude, pos.latitude],
          icon: "http://webapi.amap.com/images/marker_sprite.png",
          // offset: new AMap.Pixel(-26, -13),
          autoRotation: true
        });
      }
    };

    var trackListToLineArr = function (tracklist) {
      var lineArr = [];
      for (var i = 0; i < tracklist.length; i++) {
        var pos = tracklist[i];
        lineArr.push([pos.longitude.toString(), pos.latitude.toString()]);
      }

      $scope.animationLine = lineArr;
      return lineArr;
    };

    var initCarCamerMarker = function (map) {
      if ($scope.carCamerMarker) $scope.carCamerMarker = null;
      var startPosition = $scope.pointArr[0];


      if ($scope.carCamerMarker ){
        $scope.carCamerMarker.setMap(null);
      }

      $scope.carCamerMarker = new AMap.Marker({
        map: map,
        position: [startPosition.longitude, startPosition.latitude],
        icon: "http://code.mapabc.com/images/car_03.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true
      });

      map.setCenter([startPosition.longitude, startPosition.latitude]);
      map.setZoom(19);
    };

    var drawPloyline = function (map, lineArr) {
      // 绘制轨迹
      if( $scope.polyline){
        $scope.polyline.setMap(null);
      }

      $scope.polyline = new AMap.Polyline({
        map: map,
        path: lineArr,
        strokeColor: "#00a", //线颜色
        strokeOpacity: 0.4, //线透明度
        strokeWeight: 3, //线宽
        strokeStyle: "dashed" //线样式
      });
      map.setFitView();
    };

    $scope.startAnimation = function () {
      console.log("start animation!");
      console.log($scope.animationLine);
      $scope.carCamerMarker.moveAlong($scope.animationLine, 80);
    };

    $scope.stopAnimation = function () {
      $scope.carCamerMarker.stopMove();
      $scope.carCamerMarker.setMap(null);
      initCarCamerMarker($scope.aMap);
    };

    $scope.showCtrlButtons = function () {
      $scope.isShowCtrlBtn = true;
    };

    $scope.showPosition = function () {
      if ($scope.car.devId != '' && $scope.longitude != '' && $scope.latitude != '') {

        $scope.aMap = $scope.aMap ? $scope.aMap : new AMap.Map("car_map");
        $scope.aMap.setZoom(19);

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
    $scope.showPopup = function () {
      $scope.timeSpanData = {};
      $scope.timeSpanData.start_time = new Date();
      $scope.timeSpanData.spanHour = 1;

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/time_span_popup.html',
        title: '查询起始时间',
        scope: $scope,
        buttons: [{
          text: '取消'
        }, {
          text: '<b>查询</b>',
          type: 'button-positive',
          onTap: function (e) {
            return $scope.timeSpanData;
          }
        }]
      });
      myPopup.then(function (res) {
        console.log('Tapped!', res);
        if (res) {
          $scope.start_time = formatAsSimple(res.start_time);
          $scope.end_time = formatAsSimple(new Date(res.start_time.valueOf() - parseInt(res.spanHour) * 60 * 60 * 1000));
          console.log("carid: ", $scope.car.id, "start_time:" + $scope.start_time, "end_time:" + $scope.end_time);
          getPointArr(User.getUsername(), $scope.car.id, $scope.start_time, $scope.end_time, parseInt(res.spanHour));
        }
      });
    };

    $scope.showDevInfoPopup = function () {
      var myPopup = $ionicPopup.show({
        templateFromUrl: 'templates/dev_info.html',
        title: '设备信息',
        scope: $scope,
        buttons: [{
          type: 'button-positive',
          text: '关闭'
        }]
      });
    };

    var formatAsSimple = function (datetimeObj) {
      if (datetimeObj && 'function' == typeof datetimeObj.getYear) { // 不空且是日期时间对象
        var spArr = datetimeObj.toJSON().split('T');
        return spArr[0] + " " + spArr[1].slice(0, 8);
      } else {
        return '';
      }
    }

  }]);

