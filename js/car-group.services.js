


    AppService.service('CarGroup', function($q, WilddogNotifyBaseURL) {
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
    });

  
