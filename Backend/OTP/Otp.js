const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  otp: { type: String, required: true },
  expiry: { type: Date, required: true },
});

const OTPModel = mongoose.model('OTP', otpSchema);
module.exports = OTPModel