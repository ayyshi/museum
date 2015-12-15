angular
  .module('museum-events', ['ui.router'])
  .config(EventRouter);

function EventRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');

  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'showAll.html'
  })
  .state('newEvent', {
    url: '/event/new',
    templateUrl: 'newEvent.html'
  })
  .state('editEvent', {
    url: '/event/edit/:id',
    templateUrl: 'editEvent.html'
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
