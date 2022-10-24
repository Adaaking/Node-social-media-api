const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const helmet = require('helmet')
const morgan = require("morgan")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")


mongoose.connect(process.env.MONGOOSE_URL,() => {
    console.log("connected to db")
})

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);



app.listen(8800, () => {
    console.log('server is running')
})