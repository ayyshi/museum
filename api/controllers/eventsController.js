'use strict';

const request    = require('request');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const Event      = require('../models/event');

// show all events
function getAll(req, res){
  Event.find((err, events) => {
    // returns events in decending order of startDate and startTime
    res.send(events.sort({startDate: -1, startTime: -1}));
  });
};

// POST new event
function newEvent(req, res){
  // convert dates from UTC
  let startDate = dateFormat(req.body.startDate, "mmm dd, yyyy");
  let endDate = dateFormat(req.body.endDate, "mmm dd, yyyy");
  // convert times from UTC
  let startTime = dateFormat(req.body.startTime, "HH:MM");
  let endTime = dateFormat(req.body.endTime, "HH:MM");

  let eventParams = {
    title:        req.body.title,
    description:  req.body.description,
    type:         req.body.type,
    category:     req.body.category,
    startDate:    req.body.startDate,
    displayStart: startDate,
    startTime:    startTime,
    endDate:      req.body.endDate,
    displayEnd:   endDate,
    endTime:      endTime,
    location:     req.body.location,
    eventUrl:     req.body.eventUrl,
    tags:         req.body.tags
  };

  let eventObj = new Event(eventParams);

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

// search for event
function searchEvent(req, res){
  // change search term to lower case
  let term = req.params.term.toLowerCase();

  Event.where({'tags': term}).exec(function(err, events){
    console.log(events);
    if(err) res.status(401).send('couldn\'t match event ' + err)
    // send amount of results and results
    res.send({msg: events.length + ' EVENTS FOUND', events: events});
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
  searchEvent: searchEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent
};
