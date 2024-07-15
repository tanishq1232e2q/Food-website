const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    Isadmin:{
        type:Boolean,
        default:false
    }
   
})


userschema.methods.generatetoken=async function(){
    try {
        //payload
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email
            
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        }
    )

    } catch (error) {
        console.log(error);
    }
}
const Users=new mongoose.model("user",userschema)
module.exports=Users