const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const helmet = require('helmet')
const morgan = require("morgan")
const multer = require("multer")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")
const conversationRoutes = require("./routes/conversations")
const messageRoutes = require("./routes/messages")


mongoose.connect(process.env.MONGOOSE_URL,() => {
    console.log("connected to db")
})

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/conversations",conversationRoutes)
app.use("/api/messages",conversationRoutes)
// const storage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,"public/images");
//     },
//     filename:(req,file,cb) => {
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({storage});
// app.post("/api/upload",upload.single("file", (req,res) => {
//     try{
//       res.status(200).json("file uploaded successfully");
//     }catch(e){
//         res.status(403).json(err.message)
//     }
// }))


app.listen(8800, () => {
    console.log('server is running')
})