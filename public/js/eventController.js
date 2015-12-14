'use strict';

angular.module('museum-events', [])
  .controller('EventController', EventController);

EventController.$inject = ['$http'];

function EventController($http){
  this.getEvents = getEvents;
  this.addEvent = addEvent;
  this.newEvent = {};

  getEvents();

  function getEvents(){
    $http
      .get('http://localhost:3000/events')
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
