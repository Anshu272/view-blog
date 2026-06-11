import jwt from 'jsonwebtoken'
import {errorhandler} from './errorhandler.js'

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if (!token){
        return next(errorhandler(401,'Unauthorize'));
    }
  
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if (err){
            return next(errorhandler(401,'Unauthorize'));
        }
        req.user=user;
        next();
    });
};