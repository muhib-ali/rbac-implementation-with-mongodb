const express = require("express")
const verifytoken = require("../middlewares/authMiddleware")
const requireRole = require("../middlewares/roleAuthMiddleware")

const router = express.Router()

router.get("/admin",verifytoken,requireRole("admin"),(req,res)=>{
    res.json({message:"Welcome Admin"})
})

router.get("/manager",verifytoken,requireRole("admin","manager"),(req,res)=>{
    res.json({message:"Welcom Manager"})
})

router.get("/user",verifytoken,requireRole("admin","manager","user"),(req,res)=>{
    res.json({message:"Welcom User"})
})
module.exports= router;