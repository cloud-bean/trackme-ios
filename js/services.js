angular.module('starter.services', [])
    .constant('TranslatorServerURL', 'http://120.25.227.156:8080/trackService/rest')
    // .constant('TranslatorServerURL', 'http://192.168.191.5:8080/trackService/rest')
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
    .factory('User', ['', function() {
        var userid = "testUserID";
        return {
            getUserId: function() {
                return userid;
            }
        };
    }])
    .service('TransData', function(WilddogNotifyBaseURL){
        this.listenOnPostion = function(carId, callback) {
            var positionRef = new Wilddog(WilddogNotifyBaseURL + 'position/' + carId);
            positionRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                callback(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }

    })
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
    .service('CarGroup', function($q, WilddogNotifyBaseURL){
      this.getAll = function(callback){
         var carGroupRef = new Wilddog(WilddogNotifyBaseURL + 'cargroup');
         carGroupRef.once('value', function(data){
            console.log('get car group info: '+ data);
            callback(data);
         });
      }
    })
    .service('Car', function(){
      this.getAll = function(callback) {
         var carRef = new Wilddog(WilddogNotifyBaseURL + 'cargroup');
         carRef.once('value', function(data){
            console.log('get car info: '+ data);
            callback(data);
         });
      }
    })

;


var ref_123 = "https://track-translator.wilddogio.com/cars/12341234123";
var ref_666 = "https://track-translator.wilddogio.com/cars/66666666600";
// ref_123.set({

// });


// {
//     "isLogin": 1,
//     "userid": 2,
//     "gprsIP": "61.145.122.143",
//     "gprsPort": "4508",
//     "userType": 1
// }

// {
//     carId
//     longitude
//     latitude
//     direction
//     speed
//     alarm
//     distant
//     status
//     isLocated
//     sdate
// }
