const model = require('../models/User');

module.exports = {
  login: (req, res) => {
    res.status(200).send({ msg: 'Login Success' });
  },
  register: (req, res) => {
    res.status(200).send({ msg: 'Registration Successful' });
  }
};
