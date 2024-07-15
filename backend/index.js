require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const adminroute = require("./routes/adminroute")
const Connection = require("./db/db")
const multer = require("multer")
const mongoose=require("mongoose")
const imglist = require("./models/Imageschema")
const port = process.env.PORT;
const userimg=require("./models/userimage")
const userlist=require("./models/userimg")
const userroute=require("./routes/userroute")

const adminmiddle=require("./middleware/adminmiddle")
const middleware=require("./middleware/middleware")


const corsoption = {
  origin: "https://food-website-client.onrender.com",
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}
app.use(cors(corsoption))

app.use(express.json())
Connection()

app.get("/", (req, res) => {
  res.send("hello products")
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/images")
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now()
    cb(null, uniquesuffix + file.originalname)
  }
})


const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/userimage")
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now()
    cb(null, uniquesuffix + file.originalname)
  }
})


const upload = multer({ storage: storage })
const upload1 = multer({ storage: storage1 })

app.post("/upload-userimg", upload1.single("image"), async (req, res) => {
  console.log(req.body);

  let userim = req.file.filename

  try {
    await userimg.create({ image: userim })
    res.json("status ok")
  } catch (error) {
    console.log(error);
  }

})

app.get("/get-userimg", async (req, res) => {
  try {
    await userimg.find({}).then((data) => {
      console.log(data);

      res.send({ status: "ok", data: data })
    })
  } catch (error) {
    console.log(error);
  }
})
/////////////////////////////////////////////////////////////////////////



app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body);

  const imagename = req.file.filename

  try {
    await imglist.create({ image: imagename })
    res.json("status ok")
  } catch (error) {
    console.log(error);
  }

})
app.get("/get-image", async (req, res) => {
  try {
    await imglist.find({}).then((data) => {
      console.log(data);

      res.send({ status: "ok", data: data })
    })
  } catch (error) {
    console.log(error);
  }
})
app.delete("/delete-image/:id", async (req, res) => {
  try {
    const id = req.params.id
    await imglist.deleteOne({ _id: id }).then((data) => {
      console.log(data);

      res.send({ status: "ok", data: data })
    })
  } catch (error) {
    console.log(error);
  }
})








app.use("/admin", adminroute)
app.use("/user",userroute)




app.listen(port, (req, res) => {
  console.log("server working ");
})
