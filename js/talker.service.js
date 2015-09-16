AppService.service('Talker', ['$http', '$q', 'TranslatorServerURL', function(http, q, trans) {
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
            timeout: 2000
        }).success(function(data, status, headers, config) {
            deferred.resolve(data);
        }).error(function(err) {
            deferred.reject("error:" + err);
        })

        return deferred.promise;
    };

    this.getTrackList = function(carid, sdate, edate) {
        var deferred = q.defer();
        var postData = "carid=" + carid + "&sdate=" + sdate + "&edate=" + edate ;

        console.log("postData " + postData);

        http({
            url: trans + '/track',
            method: "POST",
            data: postData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 8000
        }).success(function(data, status, headers, config) {
            console.log("get http response, the data is:", data);
            deferred.resolve(data);
        }).error(function(err) {
            deferred.reject("error:" + err);
        })

        return deferred.promise;
    };


}]);
