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


