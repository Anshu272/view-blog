import express from "express";
import {sign} from '../controllers/signup.controller.js'
const auth=express();
auth.post("/auth",sign)
export default auth; 