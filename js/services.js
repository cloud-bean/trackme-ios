angular.module('starter.services', [])
    .constant('TranslatorServerURL', 'http://120.25.227.156:8080/trackService/rest')
    // .constant('TranslatorServerURL', 'http://192.168.191.5:8080/trackService/rest')
    .constant('WilddogNotifyBaseURL', 'https://track-translator.wilddogio.com/')

    .factory('User', ['', function() {
        var userid = "testUserID";
        return {
            getUserId: function() {
                return userid;
            }
        };
    }])

    .service('TransData', function($q, WilddogNotifyBaseURL) {
        this.listenOnPostion = function(carId) {
            var positionRef = new Wilddog(WilddogNotifyBaseURL + 'position/' + carId);
            var deferred = $q.defer();

            positionRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                deferred.resolve(snapshot.val());
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
                deferred.reject("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }

    })

    .service('Talker', ['$http', '$q', 'TranslatorServerURL', function(http, q, trans) {
        this.login = function(username, password) {
            var deferred = q.defer();
            var postData = "username=" + username + "&password=" + password;

            console.log("postData " + postData);

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

    .service('CarGroup', function($q, WilddogNotifyBaseURL) {
        this.list = [];

        this.getGroupList = function() {
            var carGroupRef = new Wilddog(WilddogNotifyBaseURL + 'cargroup');
            var deferred = $q.defer();

            carGroupRef.once('value', function(snapshot) {
                this.list = snapshot.val();
                deferred.resolve(this.list);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    })

    .service('Car', function($q, WilddogNotifyBaseURL) {
        this.list = [];

        this.getAllCars = function() {
            var deferred = $q.defer();
            var carRef = new Wilddog(WilddogNotifyBaseURL + 'car');
            carRef.once('value', function(snapshot) {
                this.list = snapshot.val();
                deferred.resolve(this.list);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        this.getCarByID = function(carId) {
            for (var i = this.list.length - 1; i >= 0; i--) {
                if (this.list[i].id === carId + "") {
                    return this.list[i];
                }
            };
        }

    })

