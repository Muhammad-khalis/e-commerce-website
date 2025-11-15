const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/E-commerce");
const userSchema=mongoose.Schema({
  fullname : String,
  email : String,
  password : String,
  Cart :[ {
    type : mongoose.Schema.Types.ObjectId,
   ref :"product", 
  },],

  orders : {
    type : Array,
    default: [],
  },
  contact : Number,
  picture : String,
})

module.exports=mongoose.model("user",userSchema);
