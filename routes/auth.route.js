import express from "express";
import {sign} from '../controllers/signup.controller.js'
const router=express.Router();
router.post("/signup",sign)
export default router; 