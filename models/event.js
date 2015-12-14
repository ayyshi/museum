'use strict';

const mongoose = require('mongoose');

let EventSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  type:        { type: String },
  category:    { type: String },
  startDate:   { type: Date, required: true },
  endDate:     { type: Date },
  location:    { type: String, required: true },
  eventUrl:    { type: String },
  tags:        [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
});

let Event = mongoose.model('Event', EventSchema);

module.exports = Event;
