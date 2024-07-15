const mongoose=require("mongoose")

const productschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
   
})

const Products=new mongoose.model("product",productschema)
module.exports=Products