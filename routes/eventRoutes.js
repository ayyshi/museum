'use strict';

const express        = require('express');
const router         = express.Router();
const expressJwt     = require('express-jwt');
const methodOverride = require('method-override');

const events      = require('../controllers/eventsController');
const secret      = process.env.SECRET;

router.route('/showAll')
  .get(events.getAll);

router.route('/show/:id')
  .get(events.getEvent);

router.route('/new')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .post(events.newEvent);

router.route('/search/:term')
  .get(events.searchEvent);

router.route('/edit/:id')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .put(events.updateEvent)
  .delete(events.deleteEvent);

module.exports = router;
