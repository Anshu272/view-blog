import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorhandler } from '../utils/errorhandler.js';

export const sign= async (req,res,next)=>{
    const {username , email, password}=req.body;
    if (!username || !email || !password || username=== '' || email=== '' || password===''){
        return next(errorhandler(400,"All fields are required"));
    }
    const haspass=bcryptjs.hashSync(password,10)
    const user= new User({
        username,
        email,
        password:haspass,
    });
    try {
        await user.save()
        res.send('sucess')     
    } catch (error) {
        next(error)
    }
} 