'use strict';

angular.module('museum-events')
  .controller('UserController', UserController)
  .controller('EventController', EventController);

UserController.$inject = ['$http'];
EventController.$inject = ['$http'];

function UserController($http){
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
      });
  };

  function logoutUser(){
    // remove token from localStorage
    localStorage.removeItem('userToken');
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
    // change tags from string into array of items
    self.newEvent.tags = self.newEvent.tags.split(', ');

    $http
      .post('http://localhost:3000/events/new', self.newEvent)
      .then(function(res){
        getEvents();
      });
      self.newEvent = {};
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
