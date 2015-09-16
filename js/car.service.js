  AppService.service('Car', function($q, WilddogNotifyBaseURL) {
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

    });
