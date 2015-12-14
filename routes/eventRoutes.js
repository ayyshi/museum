'use strict';

const express    = require('express');
const router     = express.Router();
const expressJwt = require('express-jwt');
const events      = require('../controllers/eventsController');
const secret     = "omgfivemoredays";

router.route('/showAll')
  .get(events.getAll);

router.route('/show/:id')
  .get(events.getEvent);

router.route('/new')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .post(events.newEvent)

router.route('/edit/:id')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .put(events.updateEvent)
  .delete(events.deleteEvent);

module.exports = router;
