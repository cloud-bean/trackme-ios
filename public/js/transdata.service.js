AppService.service('TransData',
  ["$q", "User", "WilddogNotifyBaseURL",
  function ($q, User, WilddogNotifyBaseURL) {
    this.listenOnPosition = function (carId) {
      console.log(WilddogNotifyBaseURL + User.getUsername() + '/position/' + carId);
      var positionRef = new Wilddog(WilddogNotifyBaseURL + User.getUsername() + '/position/' + carId);
      var deferred = $q.defer();

      positionRef.on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.val()
          ? deferred.resolve(snapshot.val())
          : deferred.reject("no data");

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        deferred.reject("The read failed: " + errorObject.code);
      });
      return deferred.promise;
    };


    this.getTrackList = function (refString) {
      console.log("the hash_id is ", refString);
      var trackListRef = new Wilddog(WilddogNotifyBaseURL + refString);
      var deferred = $q.defer();

      trackListRef.once("value", function (snapshot) {
        snapshot.val()
          ? deferred.resolve(snapshot.val())
          : deferred.reject("no data");
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        deferred.reject(errorObject.code);
      });
      return deferred.promise;
    };

    this.getLoginResult = function (refString) {
      var deferred = $q.defer();
      var loginResultRef = new Wilddog(WilddogNotifyBaseURL + refString);

      loginResultRef.once("value", function (snapshot) {
        var arr = snapshot.val();

        arr
          ? deferred.resolve(arr[Object.keys(arr)[0]])
          : deferred.reject("no data");

      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };
  }]);