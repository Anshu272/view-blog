import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import router1 from './routes/user.route.js'
import auth from './routes/auth.route.js'
const app=express()
configDotenv()
app.use(express.json())

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
app.use("/api/user",router1)
app.use("/api/auth",auth)