/**
 * Created by hygkui on 15/10/1.
 */

App.service("store",["$localstorage",
  function ($localstorage) {
    this.put = function(key, value) {
       $localstorage.set(key, value);
    };
    this.get = function(key){
      return null || $localstorage.get(key);
    };

    this.getSaveConfig = function () {
      return $localstorage.get("save");
    };

    this.setSavedTrue = function () {
      $localstorage.set("save", true);
    };

    this.setSavedFalse = function () {
      $localstorage.set("save", false);
    };

  }]);
