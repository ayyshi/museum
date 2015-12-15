'use strict';

angular.module('museum-events')
  .controller('UserController', UserController)
  .controller('EventController', EventController);

UserController.$inject = ['$http', '$state'];
EventController.$inject = ['$http'];

function UserController($http, $state){
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
        $state.go('index');
      });
  };

  function logoutUser(){
    // remove token from localStorage
    localStorage.removeItem('userToken');
    $state.go('login');
  };
};

function EventController($http){
  // constructor(public authHttp:AuthHttp) {}
  let self          = this;
  self.all          = [];
  self.getEvents    = getEvents;
  self.addEvent     = addEvent;
  // new event params
  self.newEvent     = {};
  self.updateEvent  = updateEvent;
  self.searchEvent  = searchEvent;
  self.term         = "";
  self.results      = [];
  // updated params
  self.updatedEvent = {};
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
      });
      self.newEvent = {};
  };

  function searchEvent(){
    $http
      .get('http://localhost:3000/events/search/' + self.term)
      .then(function(res){
        self.results = res.data;
      });
  };

  function updateEvent(event){
    $http
      .put('http://localhost:3000/events/edit' + event._id, self.updatedEvent)
      .then(function(res){
        getEvents();
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
