import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import router from './routes/user.route.js'
import auth from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import post from './routes/post.route.js'
const app=express()
configDotenv()
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log("hello")  
});
app.get('/',(req,res)=>{
    res.send("hello")
})
app.use("/api/user",router)
app.use("/api/auth",auth)
app.use("/api/auth",auth)
app.use("/api/post",post)
app.use((error,req,res,next)=>{
    const errcode=error.statusCode || 500
    const errmsg=error.message || "internal Time server error"
    res.status(errcode).json({
        success:false,
        errmsg,
        errcode,
    })
})