/* eslint-disable require-atomic-updates */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const handler = require('./handler');
const ErrorMessage = require('../utils/errorMessage');
const User = require('../models/User');

exports.protect = handler(async(req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if(req.cookie.token) {
  //   token = req.cookies.token;
  // }
  if(!token) {
    return next(new ErrorMessage('Not authorized to access this route', 401));
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
     
    req.user = await User.findById(decoded.id);
    next();
  } catch(err) {
    return next(new ErrorMessage('Not authorized to access this route', 401));
  }
});
