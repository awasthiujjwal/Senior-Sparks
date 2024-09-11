const mongoose = require ('mongoose')
const Userschema = new mongoose.Schema({
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
      },
   createdAt: {
        type: Date,
        default:Date.now
    },
    updatedAt: {
        type: Date,
        default:Date.now
    },
    
},{Timestamps:true})

Userschema.pre('save',function (next){
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model ('RegisterUsers',Userschema);