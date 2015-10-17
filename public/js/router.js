App.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          cache: true,
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    
    .state('tab.groups', {
      url: '/groups',
      views: {
        'tab-groups': {
          cache: false,
          templateUrl: 'templates/tab-groups.html',
          controller: 'CarGroupCtrl',
          resolve: {
            username: function ($q, User) {
              return User.getUsername();
            }
          }
        }
      }
    })

    .state('cars', {
      cache: false,
      url: '/cars/:id',
      templateUrl: 'templates/car.html',
      controller: 'carCtrl'
    })

    .state('alarm', {
      cache: false,
      url: '/alarm',
      controller: 'alarmCtrl',
      templateUrl: 'templates/alarm.html'
    })

    .state('cmd', {
      cache: false,
      url: '/cmd',
      controller: 'cmdCtrl',
      templateUrl: 'templates/command.html',
      resolve: {
        msg: function() {
          return "";
        }
      }
    })

    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting.html',
          controller: 'SettingCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}]);
