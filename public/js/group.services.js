AppService.service('CarGroup',["$q", "WilddogNotifyBaseURL",
    function($q, WilddogNotifyBaseURL) {
        this.list = [];

        this.getGroupList = function(username) {
            console.log("get group list ref: ", WilddogNotifyBaseURL + username + '/cargroup');
            var carGroupRef = new Wilddog(WilddogNotifyBaseURL + username + '/cargroup');
            var deferred = $q.defer();

            carGroupRef.once('value', function(snapshot) {
                this.list = snapshot.val();
                deferred.resolve(this.list);
            }, function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }]);
