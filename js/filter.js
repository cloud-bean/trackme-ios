angular.module('starter.filter', [])

.filter('parentGroup', function(){
  return function(items, groupId){
    var resultArray = [];
    angular.forEach(items, function(item){
      if(item.carGroupId === groupId + "") {
        resultArray.push(item);
      }
    });
    return resultArray;
  }
})

.filter('cutCharF', function () {
    return function(origStr){
      var destStr = "";
      if (origStr.indexOf("f") > 0) {
        destStr = origStr.substring(0, origStr.indexOf("f"));
      }
      return destStr;
    }
  })
;


