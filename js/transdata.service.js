
    AppService.service('TransData', function($q, WilddogNotifyBaseURL) {
        this.listenOnPostion = function(carId) {
            var positionRef = new Wilddog(WilddogNotifyBaseURL + 'position/' + carId);
            var deferred = $q.defer();

            positionRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                snapshot.val() ? deferred.resolve(snapshot.val()) : deferred.reject("no data");
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
                deferred.reject("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }

    });