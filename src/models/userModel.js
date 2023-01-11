//______________________ Import or Require Modules ________________________________

const mongoose = require("mongoose");

//____________________________ Creating Schema _____________________________________

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim : true
    },
    subject: {
      type: String,
      required: true,
      trim:true
    
    },
    marks: {
      type: Number,
      required: true,   
      trim : true
    },
    deletedAt:{
        type:Date
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    

  } , { timestamps: true }
);
//______________________ Export the Modules ________________________________

module.exports = new mongoose.model("StudentData", studentSchema);