const twilio = require('twilio');
const UserModel = require('../Models/UserModel');
const OTPModel = require('../OTP/Otp');   // Model to store OTPs

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP
const sendOTP = async (mobileNumber, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+1234567890', // Replace with your Twilio phone number
      to: mobileNumber,
    });
  } catch (error) {
    throw new Error('Error sending OTP',error);
  }
};

const CreateUser = async (req, res) => {
  const {  mobileNumber, otp } = req.body;

  // Check if user already exists
  let find = await UserModel.findOne({ mobileNumber });
  if (find) {
    return res.json({ msg: 'User already exists', success: false });
  }

  // Verify OTP
  let otpEntry = await OTPModel.findOne({ mobileNumber });
  if (!otpEntry || otpEntry.otp !== otp || otpEntry.expiry < Date.now()) {
    return res.json({ msg: 'Invalid or expired OTP', success: false });
  }

  // Create user
  try {
    const user = await UserModel.create({
      mobileNumber
    });

    // Delete OTP after successful user creation
    await OTPModel.deleteOne({ mobileNumber });

    return res.json({ msg: 'User details saved successfully', user, success: true });
  } catch (error) {
    return res.json({ msg: 'Error in saving user details', error, success: false });
  }
};

// Function to initiate OTP process
const initiateOTP = async (req, res) => {
  const { mobileNumber } = req.body;
  
  // Generate OTP
  const otp = generateOTP();

  // Store OTP
  const otpEntry = new OTPModel({
    mobileNumber,
    otp,
    expiry: Date.now() + 300000, // 5 minutes validity
  });
  await otpEntry.save();

  // Send OTP
  try {
    await sendOTP(req,res);
    res.json({ msg: 'OTP sent successfully', success: true });
  } catch (error) {
    res.json({ msg: 'Error sending OTP', error, success: false });
  }
};

module.exports = { CreateUser, initiateOTP };