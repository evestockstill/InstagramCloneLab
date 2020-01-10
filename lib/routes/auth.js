const express = require('express');
const { signup, login, getMe, forgotPassword } = require('../controller/auth');
const { protect } = require('../middleware/auth'); //to protect routes

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
