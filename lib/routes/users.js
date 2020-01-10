const router = require('express').Router();
const controller = require('./controller/user');

router.post('./login', controller.login);

module.exports = router;
