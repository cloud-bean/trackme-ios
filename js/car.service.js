AppService.factory('Car', function ($q, WilddogNotifyBaseURL) {
  this.carList = [];

  this.getAllCars = function (username) {
    // send get all cars cmd
    // TranslatorServerURL
    console.log("get all cars list ref: ", WilddogNotifyBaseURL + username + '/car');

    var deferred = $q.defer();
    var carRef = new Wilddog(WilddogNotifyBaseURL + username + '/car');
    carRef.once('value', function (snapshot) {
      this.carList = snapshot.val();
      deferred.resolve(this.carList);
    }, function (err) {
      deferred.reject(err);
    });
    return deferred.promise;
  };

  this.getCarByID = function (_id) {
    var obj;
    angular.forEach(this.carList, function(v, k){
      if ( k === _id + "") {
        obj = v;
      }
    });
    return obj;
  };

  this.getCarNameByDevId = function(devId){
    var name = 'unTitled';
    console.log(name, devId);
    angular.forEach(this.carList, function(car){
      console.log(car);
      if ( car.devId + "" === devId + "") {
        name = car.name;
      }
    });

    console.log(name, devId);
    return name;
  };

  return this;
});

