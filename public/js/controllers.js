'use strict';

angular.module('museum-events', [])
  .controller('UserController', UserController);
  .controller('EventController', EventController);

UserController.$inject = ['$http'];
EventController.$inject = ['$http'];

function UserController($http){
  this.addUser = addUser;
  this.newUser = {};

  function addUser(){
    $http
      .post('http://localhost:3000/user/auth', this.newUser)
      .then(function(res){
        console.log('user saved');
      });
      this.newUser = {};
  };
};

function EventController($http){
  this.getEvents = getEvents;
  this.addEvent = addEvent;
  this.newEvent = {};

  getEvents();

  function getEvents(){
    $http
      .get('http://localhost:3000/events/showAll')
      .then(function(res){
        res.data;
      });
  };

  function addEvent(){
    // change tags from string into array of items
    this.newEvent.tags = this.newEvent.tags.split(', ');

    $http
      .post('http://localhost:3000/events', this.newEvent)
      .then(function(res){
        getEvents();
      });
      this.newEvent = {};
  };
};
