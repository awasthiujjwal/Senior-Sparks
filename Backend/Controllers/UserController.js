// controllers/userController.js
const User = require('../Models/UserModel')

// Function to send OTP (Stub function, replace with actual SMS API logic)
const sendOtp = (mobile, otp) => {
    console.log(`Sending OTP ${otp} to mobile number ${mobile}`);
};

// Generate OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Send OTP function
const sendOtpToUser = async (req, res) => {
    const { mobile } = req.body;
    const otp = generateOtp();
    const otpExpires = Date.now() + 3600000; // 1 hour from now

    try {
        let user = await User.findOne({ mobile });
        if (user) {
            user.otp = otp;
            user.otpExpires = otpExpires;
        } else {
            user = new User({ mobile, otp, otpExpires });
        }
        await user.save();

        sendOtp(mobile, otp);

        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error',error });
    }
};

// Verify OTP function
const verifyOtp = async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        const user = await User.findOne({ mobile, otp });
        if (!user) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ error: 'OTP expired' });
        }

        // Clear OTP and expiration date after verification
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create User function
const createUser = async (req, res) => {
    const { mobile } = req.body;

    try {
        let user = await User.findOne({ mobile });
        if (user) {
            // User already exists, return a message or update as needed
            return res.status(400).json({ error: 'User already exists' });
        }

        user = new User({ mobile }); // No OTP needed for creation
        await user.save();

        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export the controller functions
module.exports = {
    sendOtpToUser,
    verifyOtp,
    createUser
};