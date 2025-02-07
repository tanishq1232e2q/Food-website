const express=require("express")
const route=express.Router()
const {addproducts,getproducts,updateproducts,deleteproducts,getadminuser, deluser, updateuser,contact}=require("../controllers/admincontroller")
const adminmiddle=require("../middleware/adminmiddle")

const middleware=require("../middleware/middleware")


// route.get("/",middleware,adminmiddle,getproducts)
route.get("/users",getadminuser)
route.delete("/delusers/:id",deluser)
route.put("/upusers/:id",updateuser)
route.post("/addproducts",addproducts)
route.get("/getproducts",getproducts)
route.get("/getcontacts",contact)
route.put("/updateproducts/:id",updateproducts)
route.delete("/deleteproducts/:id",deleteproducts)

module.exports=route