'use strict';

const express    = require('express');
const router     = express.Router();
const expressJwt = require('express-jwt');
const events      = require('../controllers/eventsController');

router.route('/showAll')
  .get(events.getAll);

router.route('/show/:id')
  .get(events.getEvent);

router.route('/')
  .post(events.newEvent)
  .put(events.updateEvent)
  .delete(events.deleteEvent);

module.exports = router;
