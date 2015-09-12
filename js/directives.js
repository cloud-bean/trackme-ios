angular.module('starter.directives', [])
    .directive('myAmap', function() {
        // Runs during compile
        return {
            scope: {
                lng: '@',
                lat: '@',
                devid: '@'
            },
            controller: function($scope, $element, $attrs, $transclude) {
                $scope.showPosition = function() {
                    console.log('start to center the map.', $scope);
                    var mapObj = new AMap.Map($scope.devid);

                    mapObj.setZoom(12);
                    console.log($scope.lng, $scope.lat, $scope);

                    var position = new AMap.LngLat('', '');

                    if ($scope.lng != '' && $scope.lat != '') {
                        position = new AMap.LngLat($scope.lng, $scope.lat);
                    }

                    mapObj.setCenter(position);

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
                };

            },
            restrict: 'E',
            templateUrl: "../templates/amap.directive.html",
            replace: true,
            link: function(scope, iElm, iAttrs) {
                // todo: first init to get the pos of the device

            }
        };
    });
