'use strict';

const mongoose = require('mongoose');

let EventSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  type:         { type: String },
  category:     { type: String },
  startDate:    { type: Date, required: true },
  displayStart: { type: String },
  startTime:    { type: String },
  endDate:      { type: Date },
  displayEnd:   { type: String },
  endTime:      { type: String },
  location:     { type: String, required: true },
  eventUrl:     { type: String },
  tags:         [{ type: String, required: true }]
});

let Event = mongoose.model('Event', EventSchema);

module.exports = Event;
