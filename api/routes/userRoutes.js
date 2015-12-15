'use strict';

const express        = require('express');
const router         = express.Router();
const expressJwt     = require('express-jwt');
const methodOverride = require('method-override');

const user       = require('../controllers/userController');
const secret     = "omgfivemoredays";

router.route('/auth')
  .post(user.authUser);

router.route('/signup')
  .post(user.newUser);

router.route('/:id')
  // .all(expressJwt({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  // get single user
  .get(user.getUser)
  // user update
  .put(user.updateUser)
  // delete user
  .delete(user.deleteUser);

module.exports = router;
