import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorhandler(400, "All fields are required"));
  }
  const haspass = bcryptjs.hashSync(password, 10);
  const user = new User({
    username,
    email,
    password: haspass,
  });
  try {
    await user.save();
    res.send({ working: "success" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorhandler(400, "All fields are required"));
  }
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errorhandler(400, "Invalid user"));
    }
    const validpass = bcryptjs.compareSync(password, validuser.password);
    if (!validpass) {
      return next(errorhandler(400, "Invalid Password"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validuser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req,res,next) => {
  const { name, email, googlephotoURL } = req.body;
  try {
    const validuser = await User.findOne({ email });
    if (validuser) {
      const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = validuser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
    else{
        const generatedpassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashpassword=bcryptjs.hashSync(generatedpassword,10)
        const newUser= new User({
            username:name.toLowerCase().split('').join('')+ Math.random().toString(9).slice(-4),    
            email,
            password:hashpassword,
            profilePicture:googlephotoURL,
        });
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
