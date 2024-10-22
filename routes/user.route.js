import express from "express";
import {test} from '../controllers/user.controller.js'
const router=express();
router.get("/test",test)
export default  router;