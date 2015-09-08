angular.module('starter.services', [])
    .constant('TranslatorServerURL', 'http://120.25.227.156:8080/trackService/rest')
    .constant('WilddogNotifyBaseURL', 'https://track-translator.wilddogio.com/')
    .factory('Cars', function() {
        var cars = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }];

        return {
            all: function() {
                return cars;
            },
            get: function(carId) {
                for (var i = cars.length - 1; i >= 0; i--) {
                    if (cars[i].id === parseInt(carId)) {
                        return cars[carId];
                    }
                }
                return null;
            }
        };
    })
    .factory('User', ['', function(){
      var userid = "testUserID";
      return {
        getUserId: function(){
          return userid;
        }
      };
    }])
    .service('Talker', ['$http', '$q', 'TranslatorServerURL', 'WilddogNotifyBaseURL', function(http, q, trans, notify) {
        this.login = function(username, password) {
            var deferred = q.defer();
            var postData = "username=" + username + "&password=" + password;
            console.log("postData" + postData);

            http({
                url: trans + '/login/a',
                method: "POST",
                data: postData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 8000
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(err) {
                deferred.reject("error:" + err);
            })

            return deferred.promise;
        };


    }])

;
