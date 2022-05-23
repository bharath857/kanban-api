const express = require('express');
const router = express.Router();

const { createNewUser, loginUser } = require('../../controllers/login/login');

router.route('/signUp').post(createNewUser)
router.route('/login').post(loginUser)

module.exports = router