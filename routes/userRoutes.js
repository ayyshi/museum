'use strict';

const express    = require('express');
const router     = express.Router();
const user       = require('../controllers/userController');
const expressJwt = require('express-jwt');
const secret     = "omgfivemoredays";

router.route('/user/auth')
  .post(user.authUser);

router.route('/user/signup')
  .post(user.newUser);

router.route('/user')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  .delete(user.deleteUser);

router.route('/user/:username')
  .all(expressJwt({
    secret: secret,
    userProperty: 'auth'
  }))
  // get single user
  .get(user.getUser)
  // user update
  .put(user.updateUser);

module.exports = router;
