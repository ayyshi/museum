angular
  .module('museum-events', ['ui.router'])
  .config(EventRouter);

function EventRouter($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');

  $stateProvider
  .state('index', {
    url:'/',
    templateUrl: 'showAll.html'
  })
  .state('newEvent', {
    url:'/newEvent',
    templateUrl: 'newEvent.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login.html'
  })
};
