import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv'
import router from './routes/user.route.js'
import auth from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import post from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import path from 'path';
import job from './crons/crons.js'

const app=express()
configDotenv()
job.start()
console.log(process.env.JWT_SECRET);
app.use(express.json())
app.use(cookieParser())
const mongoUri=process.env.MONGO;
mongoose.connect(mongoUri)
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})

const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
});
app.use("/api/user",router) 
app.use("/api/auth",auth)
app.use("/api/auth",auth)
app.use("/api/post",post)
app.use("/api/comment",commentRoutes)


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
app.use((error,req,res,next)=>{
    const errcode=error.statusCode || 500
    const errmsg=error.message || "internal Time server error"
    res.status(errcode).json({
        success:false,
        errmsg,
        errcode,
    })
})