/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const User = require('../models/User');

module.exports = {
  login: (req, res) => {
    res.status(200).send({ msg: 'Login Success' });
  },
  signup: (req, res, next) => {
    let user = new User ({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }); 
    user.save()
      .then(user => {
        res.status(200).send({ msg: 'Signup Successful', userId: user._id });
      })
      .catch(next);
  }
};
