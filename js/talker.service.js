AppService.service('Talker',
  ['$http', '$q', 'TranslatorServerURL',
  function (http, q, trans) {
  this.login = function (username, password) {
    var deferred = q.defer();
    var postData = "username=" + username + "&password=" + password;

    console.log("postData " + postData);

    http({
      url: trans + '/login/login',
      method: "POST",
      data: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 3000
    }).success(function (data, status, headers, config) {
      deferred.resolve(username + '/login');
    }).error(function (err) {
      deferred.reject("error:" + err);
    });

    return deferred.promise;
  };

  this.sendRequestTrackList = function (carid, sdate, edate) {
    var deferred = q.defer();
    var postData = "carId=" + carid + "&start_time=" + sdate + "&end_time=" + edate;
    console.log("postData " + postData);

    // var postData="carId=52&start_time=2015-09-17 11:49:19&end_time=2015-09-17 12:49:19";

    console.log("postData " + postData);

    http({
      url: trans + '/track/track',
      method: "POST",
      data: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 8000
    }).success(function (data, status, headers, config) {
      console.log("get http response, the data is:", data);
      deferred.resolve(data);
    }).error(function (err) {
      deferred.reject("error:" + err);
    });

    return deferred.promise;
  };

}]);
