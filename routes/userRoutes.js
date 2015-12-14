'use strict';

const express    = require('express');
const router     = express.Router();
const expressJwt = require('express-jwt');
const user       = require('../controllers/userController');
const secret     = "omgfivemoredays";

router.route('/auth')
  .get(user.authUser);

router.route('/signup')
  .post(user.newUser);

router.route('/')
  // .all(expressJwt({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .delete(user.deleteUser);

router.route('/:username')
  // .all(expressJwt({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  // get single user
  .get(user.getUser)
  // user update
  .put(user.updateUser);

module.exports = router;
