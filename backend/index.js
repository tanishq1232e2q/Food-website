require("dotenv").config()
const express = require("express")

const app = express()
const adminroute = require("./routes/adminroute")
const Connection = require("./db/db")
const multer = require("multer")
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const mongoose=require("mongoose")
// const imglist = require("./models/Imageschema")
const port = process.env.PORT || 8000;
const userimg=require("./models/userimage")
const userlist=require("./models/userimg")
const userroute=require("./routes/userroute")

const adminmiddle=require("./middleware/adminmiddle")
const middleware=require("./middleware/middleware")
const fs = require("fs");
const path = require("path");

const corsoption = {
  origin: "https://food-website-client.onrender.com",
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}
app.use(cors(corsoption))

app.use(express.json())
Connection()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("hello products")
})
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    format: async (req, file) => "jpeg", // Convert images to JPEG
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique filename
  },
});







const upload = multer({ storage: storage })

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  publicId: String,
});
const ImageModel = mongoose.model("Image", imageSchema);



/////////////////////////////////////////////////////////////////////////




app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const newImage = new ImageModel({
      imageUrl: req.file.path, // Cloudinary image URL
      publicId: req.file.filename, 
    });
    await newImage.save();
    res.json({ status: "ok", data: newImage });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ status: "error", message: "Upload failed" });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    const images = await ImageModel.find({});
    res.json({ status: "ok", data: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch images" });
  }
});

//Delete Image from Cloudinary and Database
app.delete("/delete-image/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await ImageModel.findById(id);

    if (!image) {
      return res.status(404).json({ status: "error", message: "Image not found" });
    }

    if (!image.publicId) {
      return res.status(400).json({ status: "error", message: "Public ID not found for this image" });
    }

    // Delete from Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.destroy(image.publicId);
    
    console.log("Cloudinary response:", cloudinaryResponse); // Debugging line

    if (cloudinaryResponse.result !== "ok") {
      return res.status(500).json({ status: "error", message: "Failed to delete image from Cloudinary" });
    }

    
    const deleteResult = await ImageModel.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 0) {
      return res.status(500).json({ status: "error", message: "Failed to delete image from database" });
    }

    console.log("Image deleted successfully from database");
    res.json({ status: "ok", message: "Image deleted successfully" });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ status: "error", message: "Failed to delete image" });
  }
});



app.use("/admin", adminroute)
app.use("/user",userroute)




app.listen(port, (req, res) => {
  console.log("server working ");
})
