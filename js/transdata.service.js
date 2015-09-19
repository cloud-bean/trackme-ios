
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


        this.getTrackList = function(refString){
             console.log("the hashid is ", refString);
            var refString = "522015-09-1711:49:192015-09-1712:49:19"
            // var refString ="522015-09-1714:02:152015-09-1715:02:15";
           
           var tracklistRef = new Wilddog(WilddogNotifyBaseURL + 'tracklist/' + refString);
            var deferred = $q.defer();

            tracklistRef.on("value", function(snapshot) {
                console.log(snapshot.val());
                snapshot.val() ? deferred.resolve(snapshot.val()) : deferred.reject("no data");
            }, function(errorObject) {
                console.log("The read failed: " + errorObject.code);
                deferred.reject("The read failed: " + errorObject.code);
            });
            return deferred.promise;
        }

    });