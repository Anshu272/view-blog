import { AiFillGoogleCircle } from "react-icons/ai";
import { Button } from "flowbite-react";
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { Signinsuccess } from "../redux/user/userslice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
  const handlegoogleclick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultfromgoogle = await signInWithPopup(auth, provider);
      console.log(resultfromgoogle)
      const res=await fetch('/api/auth/google',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name:resultfromgoogle.user.displayName,
            email:resultfromgoogle.user.email,
            googlephotoURL:resultfromgoogle.user.photoURL
        }),
      })
      const data =await res.json()
      if (res.ok){
        dispatch(Signinsuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button className="w-3/5 h-12 text-black font-bold flex items-center justify-center border-black " onClick={handlegoogleclick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-3" />
        <span>OAuth</span>
      </Button>
    </div>
  );
};
export default OAuth;
