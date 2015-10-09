AppService.factory('User', function () {
  this.info = {
    username: '',
    gprsIP: null,
    gprsPort: null,
    userType: null,
    isLogin: false,
    uesrid: null
  };

  this.setUsername = function (username) {
    console.log("current " + this.info.username + " => " + username);
    this.info.username = username;
  };

  this.getUsername = function () {
    return this.info.username;
  };

  this.getLoginState = function () {
    return this.info.isLogin;
  };

  this.setLoginState = function (loginState) {
    this.info.isLogin = loginState;
  };

  return this;
});
