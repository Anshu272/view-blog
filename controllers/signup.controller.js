import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export const sign= async (req,res)=>{
    const {username , email, password}=req.body;
    if (!username || !email || !password || username=== '' || email=== '' || password===''){
        return res.status(400).json ({message:"All fields are required"})
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
        res.status(400).json({message:error.message})
    }
}