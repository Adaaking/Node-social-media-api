const express = require("express")
const Conversation = require("../models/Conversation")
const router = express.Router()

router.post("/", async (req,res) => {
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.recieverId]
    });
    try{
        const savedConverstation = await newConversation.save();
        res.status(201).json(savedConverstation)
    }catch(err){
        console.log(err.message)
    }
});

router.get("/:userId", async (req,res) => {
    try{
        const conversation = await Conversation.find({
            members:{ $in:[req.params.userId]}
        })
        
        res.status(200).json(conversation)
    }catch(err){
        console.log(err.message)
    }
});

module.exports = router