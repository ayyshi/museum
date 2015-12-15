angular
  .module('museum-events', ['ui.router'])
  .config(EventRouter)
  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
      	if ($window.localStorage.getItem('userToken')) {
      		config.headers.Authorization =
      		  'Bearer ' + $window.localStorage.getItem('userToken');
      	}
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  // .factory('User', function() {
  //   return {
  //     loginUser : false
  //   };
  // })
  // .controller('UserController',['$scope', 'User', function($scope, User) {
  //   $scope.user = User;
  // }])
  // .run(['$rootScope', '$state', 'User', function($rootScope, $state, User) {
  //   $rootScope.$on('$stateChangeStart',
  //   function(event, toState, toParams, fromState, fromParams) {
  //
  //     let isAuthenticationRequired =  toState.data
  //           && toState.data.requiresLogin
  //           && !User.isLoggedIn;
  //
  //     if(isAuthenticationRequired) {
  //       event.preventDefault();
  //       $state.go('login');
  //     };
  //   });
  // }])

function EventRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'showAll.html'
  })
  .state('newEvent', {
    url: '/events/new',
    templateUrl: 'newEvent.html',
  })
  .state('editEvent', {
    url: '/events/edit/:id',
    templateUrl: 'editEvent.html'
  })
  .state('search', {
    url: '/events/search/:term',
    templateUrl: 'search.html'
  })
  .state('signup', {
    url: '/user/signup',
    templateUrl: 'signup.html'
  })
  .state('login', {
    url: '/user/auth',
    templateUrl: 'login.html'
  })
};
