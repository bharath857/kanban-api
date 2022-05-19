const express = require('express');
const router = express.Router();

const { createNewUser, loginUser } = require('../controllers/user/user');

router.route('/SignUp').post(createNewUser)
router.route('/login').get(loginUser)

module.exports = router