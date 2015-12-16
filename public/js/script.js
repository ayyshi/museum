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
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('events', {
    url: '/',
    templateUrl: 'showAll.html'
  })
  .state('newEvent', {
    url: '/events/new',
    templateUrl: 'newEvent.html',
  })
  .state('details', {
    url: '/events/show/:eventid',
    templateUrl: 'show.html'
  })
  .state('editEvent', {
    url:'/events/edit/:eventid',
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
  .state('loginSuccess', {
    url: '/loginSuccess',
    templateUrl: 'success.html'
  })
};
