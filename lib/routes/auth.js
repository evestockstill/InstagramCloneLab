const express = require('express');
const { signup, login } = require('../controller/auth');
// const { protect } = require('../middleware/auth'); //to protect routes

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
