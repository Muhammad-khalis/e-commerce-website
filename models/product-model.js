const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
  image : Buffer,
  name : String,
  price: Number,
  discount : {
    type : Array,
    default: [],
  },
  
})

module.exports=mongoose.model("products",productSchema);
