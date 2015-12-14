'use strict';

const request    = require('request');
const bodyParser = require('body-parser');
const Event      = require('../models/event');

// show all events
function getAll(req, res){
  Event.find((err, events) => {
    res.send(events);
  });
};

// POST new event
function newEvent(req, res){
  let eventObj = new Event(req.body);

  

  eventObj.save((err, book) => {
    if(err) res.status(401).send('couldn\'t save new event ' + err);
    res.status(200).send(book);
  });
};

// show single event
function getEvent(req, res){
  let id = req.params.id;

  Event.findById({_id: id}, function(err, event){
    if(err) res.status(401).send('couldn\'t find event: ' + err);
    res.send(event);
  });
};

// PUT event
function updateEvent(req, res){
  let id = req.params.id;

  Event.findById({_id: id}, function(err, event){
    if (err) res.status(401).send('couldn\'t find event '+ err);

    event.body = req.body;

    event.save(function(error){
      if (err) res.send('couldn\'t update event ' + error);

      res.send('event updated');
    });
  });
};

//DELETE event
function deleteEvent(req, res){
  let id = req.params.id;

  Book.remove({_id: id}, function(err){
    if(err) res.json({message: 'cannot delete: ' + err});
    res.json({message: 'book deleted!'});
  });
};

module.exports = {
  getAll: getAll,
  newEvent: newEvent,
  getEvent: getEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent
};
