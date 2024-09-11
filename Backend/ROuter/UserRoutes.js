const express = require('express');
const { CreateUser, initiateOTP } = require('../Controllers/UserController');
const router = express.Router();

router.post ('/create',CreateUser) 
router.post ('/initiate-otp', initiateOTP)


module.exports = router;