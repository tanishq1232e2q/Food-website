const mongoose=require("mongoose")

const URI=process.env.MONGO_URI;

const Connection=async()=>{
    try {
       await mongoose.connect(URI);
       console.log("mongoose connected yes");

    } catch (error) {
        console.log(error);
    }
}

module.exports=Connection