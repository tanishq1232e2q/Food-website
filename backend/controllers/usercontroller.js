const Users=require("../models/User")
const bcrypt=require("bcryptjs")
const generatetoken=require("../middleware/middleware")
const Contact=require("../models/Contactschema")
// const { default: Contact } = require("../../client/src/Pages/Contact")
const adduser=async(req,res)=>{

    const {name,email,password,cpassword}=req.body

    try {

        const salt=10;
        const hashpass=await bcrypt.hash(password,salt);

        if (cpassword!==password) {
            return res.status(400).send("password do not match")
        }
        const createuser= new Users({name,email,password:hashpass,cpassword:hashpass})

        const userexist=await Users.findOne({email:email})

        if (userexist) {
            return res.status(400).send("user exist")
        }

        const savedata=await createuser.save()

        res.json({savedata,token:await createuser.generatetoken(),userid:createuser._id.toString()})

        console.log(savedata);
    } catch (error) {
        console.log(error);
    }


   
}

const loginuser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await Users.findOne({email:email})

        
        if (user) {
            const comparepass = await bcrypt.compare(password, user.password);

            if (comparepass) {
                res.json({ token: await user.generatetoken(), userid: user._id.toString() });
            } else {
                res.status(400).send("Invalid credentials");
            }
        } else {
            res.status(400).send("Invalid credentials");
        }
    } catch (error) {
        console.log(error);
    }
}

const getuser=async(req,res)=>{
    const userdata=req.user
    console.log(userdata);
    return res.json(userdata)
}

const getcontact=async(req,res)=>{
    const contactdata=req.body

    const fg=new Contact(contactdata)
    const data=await fg.save();

    return res.json(data);


}


module.exports={adduser,loginuser,getuser,getcontact}