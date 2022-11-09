const express = require("express")
const Message = require("../models/Message")
const router = express.Router()

router.post("/",async (req,res) => {
    const message = new Message(req.body);
    try {
        const savedMesage = message.save() 
        res.status(201).json(savedMesage);
    } catch (error) {
        res.status(404).json(err)
    }
})
