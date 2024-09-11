const mongoose = require ('mongoose');

const connectToDtabase = async (req,res) =>{
await mongoose.connect ('mongodb://127.0.0.1:27017/SeniorSparks')
.then (()=>console.log ('successfully connected to mongodb'))
 .catch(()=>console.log('cannot connect to database'))
}
module .exports = connectToDtabase