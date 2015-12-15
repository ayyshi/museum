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
    url: '/events/new',
    templateUrl: 'newEvent.html'
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
