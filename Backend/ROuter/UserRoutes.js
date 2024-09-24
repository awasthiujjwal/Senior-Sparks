const express = require('express');
const {  createUser, verifyOtp, sendOtpToUser,  } = require('../Controllers/UserController');
const router = express.Router();

router.post ('/create',createUser) 
router.post ('/otpverification',verifyOtp)
router.post ('/sendotp', sendOtpToUser)

module.exports = router;