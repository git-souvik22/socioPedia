const express = require("express");
const app = express();
const port = process.env.PORT || 3500;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Successfully connected to MongoDB");
})

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "public/images");
    },
    filename:(req,file,cb) =>{
        cb(null, req.body.name);
    }
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log(err);
    }
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, ()=>{
    console.log(`server is currently running at ${port}`);
})
