const Orders = require("../models/Orderschema")


const Addorder = async (req,res) => {

    try {
        const items = req.body;
        console.log(items);
        const result = await Orders.insertMany(items).select({
            _id:0
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }

}

const Getorder=async(req,res)=>{
    try {
        // const userId=req.body.userId
        
        const getorder= await Orders.find()
        res.json(getorder)
        
        console.log(getorder);
    } catch (error) {
        console.log(error);
    }
}

module.exports={Addorder,Getorder}
