const jwt=require("jsonwebtoken")
const Users=require("../models/User")

const authmiddleware=async(req,res,next)=>{
    const token=req.header("auth")

    if (!token) {
        return res.json("token not found")
        
    }
    const jwttoken=token.replace("Bearer","").trim()
    console.log(jwttoken);
    
    try {
        const userverify=jwt.verify(jwttoken,process.env.JWT_SECRET_KEY)
        console.log(userverify);

        const finduser=await Users.findOne({email:userverify.email}).select({
            password:0
        })
        console.log(finduser);

        req.user=finduser
        req.token=token
        req.userid=finduser._id;
        next()

    } catch (error) {
        console.log(error);
    }
}

module.exports=authmiddleware

