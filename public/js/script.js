'use strict';

angular
  .module('museum-events', ['ui.router'])
  .config(EventRouter)
  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
      	if ($window.localStorage.getItem('userToken')) {
      		config.headers.Authorization =
      		  'Bearer ' + $window.localStorage.getItem('userToken');
      	} else {
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
        }
        return response || $q.when(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

function EventRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('');

  $stateProvider
  .state('events', {
    url: '',
    views: {
      'events':{
        templateUrl: 'showAll.html'
      }
    }
  })
  .state('details', {
    url: 'events/show/:eventid',
    views: {
      'events':{
        templateUrl: 'show.html'
      }
    }
  })
  .state('newEvent', {
    url: 'events/new',
    views: {
      'events':{
        templateUrl: 'newEvent.html',
      }
    }
  })
  .state('editEvent', {
    url:'events/edit/:eventid',
    views: {
      'events':{
        templateUrl: 'editEvent.html'
      }
    }
  })
  .state('search', {
    url: 'events/search/:term',
    views: {
      'events':{
        templateUrl: 'search.html'
      }
    }
  })
  .state('signup', {
    url: 'user/signup',
    views: {
      'users':{
        templateUrl: 'signup.html'
      }
    }
  })
  .state('login', {
    url: 'user/auth',
    views: {
      'users':{
        templateUrl: 'login.html'
      }
    }
  })
  .state('profile', {
    url: 'user/show/:username',
    views: {
      'users':{
        templateUrl: 'profile.html'
      }
    }
  })
  .state('editUser', {
    url: 'user/:userid',
    views: {
      'users':{
        templateUrl: 'editUser.html'
      }
    }
  });
};
