const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
    },
    desc:{
        type:String,
        max:500,
    },
    img:{
        type:String,  
    },
    likes:{
        type:Array,
        default:[]
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Post",PostSchema)
