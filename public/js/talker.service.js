AppService.service('Talker',
  ['$http', '$q', 'TranslatorServerURL',
  function ($http, $q, TranslatorServerURL) {

  this.login = function (username, password) {
    var deferred = $q.defer();
    var postData = "username=" + username + "&password=" + password;

    console.log("postData " + postData);

    $http({
      url: TranslatorServerURL + '/auth/login',
      method: "POST",
      data: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function (data) {
      deferred.resolve(data);
    }).error(function (err) {
      deferred.reject("error:" + err);
    });

    return deferred.promise;
  };

  this.logout = function(username){
    var deferred = $q.defer();

    console.log("send get url ");

    $http({
      url: TranslatorServerURL + '/auth/exit/' + username,
      method: "GET" 
    }).success(function (data) {
      deferred.resolve(data);
    }).error(function (err) {
      deferred.reject("error:" + err);
    });

    return deferred.promise;
  }

    // 弹出框的默认时间是现在时间，选择时间跨度就是过去的时间，因此在这里将start_date和end_date颠倒以符合逻辑。
  this.sendRequestTrackList = function (username, carid, edate, sdate) {
    var deferred = $q.defer();
    var postData = "username=" + username 
                 + "&carid=" + carid
                 + "&sdate=" + sdate
                 + "&edate=" + edate;

    console.log("postData " + postData);

    $http({
      url: TranslatorServerURL + '/track/track',
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
