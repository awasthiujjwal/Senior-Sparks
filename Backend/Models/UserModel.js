// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true, // This is the required field causing the error
    },
    otp: String,
    otpExpires: Date,
    // other fields
});

module.exports = mongoose.model('User', UserSchema);