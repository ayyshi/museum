'use strict';

const express        = require('express');
const router         = express.Router();
const expressJwt     = require('express-jwt');
const methodOverride = require('method-override');

const user       = require('../controllers/userController');
const secret     = process.env.SECRET;

router.route('/auth')
  .post(user.authUser);

router.route('/signup')
  .post(user.newUser);

router.route('/show/:username')
  // get single user
  .get(user.getUser);

router.route('/:id')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  // user update
  .put(user.updateUser)
  // delete user
  .delete(user.deleteUser);

module.exports = router;
