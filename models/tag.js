'use strict';

const mongoose = require('mongoose');

let TagSchema = new mongoose.Schema({
  category: { type: String },
  topic:    { type: String, required: true }
});

let Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
