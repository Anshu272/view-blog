import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import router1 from './routes/user.route.js'
import auth from './routes/auth.route.js'
const app=express()
configDotenv()

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
app.use("/test",router1)
app.use("/auth",auth)