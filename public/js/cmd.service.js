AppService.service('Command', ['$q', '$http', function(q, http){
  
  this.sendCmd = function(username, devid, ip, specUrl){
    var deferred = $q.defer();
    var postData = "username=" + username + "&devid=" + devid +"&ip=" +ip;

    console.log("send cmd:", specUrl , " postData:" + postData);

    $http({
      url: TranslatorServerURL + '/cmd/' + specUrl,
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
  }
}])