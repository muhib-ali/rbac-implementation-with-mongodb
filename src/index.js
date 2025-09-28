const express = require("express")
const dotenv = require("dotenv").config()
const dbConnect= require("./config/dbConnect")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

dbConnect()

const  app= express()
//middleware
app.use(express.json())

//routes
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
//start
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on the server ${PORT}`)
})
