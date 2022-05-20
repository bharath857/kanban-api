const express = require('express');
const router = express.Router();

const { createNewUser, loginUser } = require('../controllers/user/user');

router.route('/signUp').post(createNewUser)
router.route('/login').post(loginUser)

module.exports = router