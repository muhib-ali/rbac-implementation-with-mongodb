const User= require("../models/userModel")
const bcrypt= require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try{
        const {username,password,role}= req.body
const hashpasswd= await bcrypt.hash(password,10)

const newUser= new User({username,password:hashpasswd, role})
await newUser.save()
res.status(201).json({message:`User registered with username = ${username}`})

    }catch(err){
     res.status(500).json({message:`Something went wrong`})   
    }

}

const login = async(req, res)=>{
    try{
    const {username,password,role}= req.body
    const user= await User.findOne({username})
    if(!user){
        res.status(404).json({message:"User does not exists"})
    }

    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(400).json({message:"Incorrect Password"})
    }
    const token = jwt.sign({id:user.id,role:user.role},
        process.env.JWT_SECRET,{expiresIn:"1h"})
            return  res.status(200).json({token:`${token}`})
    }

catch(err){
      res.status(500).json({message:`Something went wrong ${err}`}) 
    }
}
module.exports= {register, login}