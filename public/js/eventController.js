'use strict';

angular.module('museum-events', [])
  .controller('EventController', EventController);

EventController.$inject = ['http'];

function EventController($http){

  function getEvents(){
    $http
      .get('http://localhost:3000/events')
      .then(function(res){
        this.all = res.data;
      });
  };
};
