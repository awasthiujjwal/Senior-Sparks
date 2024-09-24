// const express = require ('express')
// const app = express()
// const port =process.env.PORT || 5000;
// const databaseConnection = require('./datbase')
// const cors = require ("cors")
// const twilio = require ('twilio')
// app.get('/',(req,res)=>{
//     res.send('Welcome Page')
// })
// databaseConnection()
// app.use(cors())
// app.use(express.json())

// const accountSid= 'YOUR_TWILIO_ACCOUNT_SID';
// const authToken= 'YOUR_TWILIO_AUTH_TOKEN';
// const client = twilio(accountSid,authToken);
// app.listen(port,(req,res)=>{
//     console.log(`server is runnin on port ${port}`)
// })

const OTPModel = require ('./OTP/Otp')
const express = require('express');
const cors = require('cors');
const databaseConnection = require('./datbase') 

const UserRoutes = require ('./ROuter/UserRoutes')
const app = express();
const port =5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route

app.get('/', (req, res) => {
  res.send('Welcome Page');
});

// Database connection
databaseConnection();

app.use('/users',UserRoutes)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
