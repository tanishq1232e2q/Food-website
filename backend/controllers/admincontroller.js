const Contact = require("../models/Contactschema")
const Products=require("../models/Products")
const Users = require("../models/User")

const addproducts=async(req,res)=>{
    try {
        const products=await new Products(req.body)

        if (!products) {
            return res.status(400).send("product error")
        }
        const proddata=await products.save()
        console.log(req.body);
        res.json(proddata)
    } catch (error) {
        
    }
}

const getproducts=async(req,res)=>{
    try {
        const prod=await Products.find()
        if (!prod) {
            return res.json("products not found")
        }

        res.json(prod)
    } catch (error) {
        
    }
}

const updateproducts=async(req,res)=>{
    const id=req.params.id
    const updatedata=req.body
    const updateprod=await Products.updateOne({_id:id},{$set:updatedata})

    res.json(updateprod)
}

const deleteproducts=async(req,res)=>{
    const id=req.params.id
    const delprod=await Products.deleteOne({_id:id})

    return res.json(delprod)
}

const getadminuser=async(req,res)=>{
    try {
        const users=await Users.find().select({
            password:0,cpassword:0
        })
        return res.json(users)

    } catch (error) {
        console.log(error);
    }
}

const updateuser=async(req,res)=>{
    const id=req.params.id
    const updata=req.body
    const updateusers=await Users.updateOne({_id:id},{$set:updata})

   return res.json(updateusers)
}

const deluser=async(req,res)=>{
    try {
        const id=req.params.id

        const delusers=await Users.deleteOne({_id:id})

        return res.json(deluser)
    } catch (error) {
        console.log(error);
    }
}

const contact=async(req,res)=>{
    const get=await Contact.find();
    return res.json(get);
}

module.exports={addproducts,getproducts,updateproducts,deleteproducts,getadminuser,deluser,updateuser,contact}