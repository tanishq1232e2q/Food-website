const express=require("express")
const { adduser,loginuser, getuser,getcontact } = require("../controllers/usercontroller")
const authmiddleware=require("../middleware/middleware")
const router=express.Router()

router.post("/adduser",adduser)
router.post("/loginuser",loginuser)
router.get("/getuser",authmiddleware,getuser)
router.post("/contact",getcontact)

module.exports=router