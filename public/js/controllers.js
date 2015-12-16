'use strict';

angular.module('museum-events')
  .controller('UserController', UserController)
  .controller('EventController', EventController);

UserController.$inject = ['$http', '$state'];
EventController.$inject = ['$http', '$state'];

function UserController($http, $state, $stateParams){
  let self        = this;
  self.addUser    = addUser;
  // holder for newuser params
  self.newUser    = {};
  self.loginUser  = loginUser;
  // holder for login params
  self.userlogin  = {};
  self.logoutUser = logoutUser;

  function addUser(){
    $http
      .post('http://localhost:3000/user/signup', self.newUser)
      .then(function(res){
        console.log('user saved');
      });
      // reset newUser to empty
      self.newUser = {};
  };

  function loginUser(){
    $http
      .post('http://localhost:3000/user/auth', self.userLogin)
      .then(function(res){
        // save token to localStorage
        localStorage.setItem('userToken', res.data.token);
        $state.go('/');
      });
  };

  function logoutUser(){
    // remove token from localStorage
    localStorage.removeItem('userToken');
    $state.go('login');
  };
};

function EventController($http, $state){
  // constructor(public authHttp:AuthHttp) {}
  let self          = this;
  self.getEvents    = getEvents;
  self.all          = [];
  self.addEvent     = addEvent;
  self.newEvent     = {};
  self.getOne       = getOne;
  self.showEvent    = [];
  self.getOneEdit   = getOneEdit;
  self.editEvent    = [];
  // new event params
  self.updateEvent  = updateEvent;
  self.updatedEvent = {};
  self.searchEvent  = searchEvent;
  self.term         = "";
  self.results      = [];
  // updated params
  self.deleteEvent  = deleteEvent;

  getEvents();

  function getEvents(){
    $http
      .get('http://localhost:3000/events/showAll')
      .then(function(res){
        self.all = res.data;
      });
  };

  function addEvent(){
    // change tags from string into array of items of lowercase words
    self.newEvent.tags = self.newEvent.tags.toLowerCase().split(', ');

    $http
      .post('http://localhost:3000/events/new', self.newEvent)
      .then(function(res){
        getEvents();
        $state.go('/');
      });
      self.newEvent = {};
  };

  function getOne(params){
    $http
      .get('http://localhost:3000/events/show/' + params.eventid)
      .then(function(res){
        self.showEvent = res.data;
        $state.go('details');
      })
  };

  function getOneEdit(params){
    $http
      .get('http://localhost:3000/events/show/' + params.eventid)
      .then(function(res){
        self.editEvent = res.data;
        $state.go('editEvent');
      })
  };

  function searchEvent(){
    $http
      .get('http://localhost:3000/events/search/' + self.term)
      .then(function(res){
        self.results = res.data;
      });
  };

  function updateEvent(params){

    self.updatedEvent.tags = self.updatedEvent.tags.toLowerCase().split(', ');

    $http
      .put('http://localhost:3000/events/edit/' + params.eventid, self.updatedEvent)
      .then(function(res){
        getEvents();
        $state.go('/');
      });
      self.updatedEvent = {};
  };

  function deleteEvent(event){
    $http
      .delete('http://localhost:3000/events/edit' + event._id)
      .then(function(res){
        getEvents();
      });
  };
};
