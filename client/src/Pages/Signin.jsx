import React from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [formdata, setformdata] = useState({});
  const [errormessage, seterrormessage] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate=useNavigate();
  const handleform = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    // if (!formdata.username || !formdata.email || !formdata.password){
    //    return seterrormessage("fill out fields")
    //   }
    try {
      setloading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      setloading(false);
      if (res.ok){
        navigate('/')
      }
      if (data.success === false) {
        return seterrormessage(data.errmsg);
      }
    } catch (error) {
      seterrormessage("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="w-[100%]  h-screen bg-red-50 flex border-black border-solid">
      <div className="w-1/2 h-full flex justify-center pt-60">
        <div className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800  rounded-full text-5xl px-5 py-2.5 text-center me-2 mb-2  font-extrabold w-1/2 h-1/5 flex justify-center items-center ">
          View Blog
        </div>
      </div>
      <div className=" w-1/2 h-screen flex justify-center pt-[15vh] px-9  ">
        <form
          className="flex flex-col gap-4 w-full  pl-14 "
          onSubmit={handlesubmit}
        >
          <div className="w-full">
            <Label>Email</Label>
            <TextInput
              type="email"
              placeholder="Enter Your Email"
              className="w-3/5"
              onChange={handleform}
              id="email"
            ></TextInput>
          </div>
          <div className="w-full">
            <Label>Password</Label>
            <TextInput
              type="password"
              placeholder="Enter Your Password"
              className="w-3/5"
              onChange={handleform}
              id="password"
            ></TextInput>
          </div>
          <Button
            className=" bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg text-l px-5 py-2.5 text-center me-2 mb-2 mt-4 text-white w-3/5 h-12 flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="w-6 h-6 pr-2 " />
                <span>Loading...</span>
              </>
            ) : (
              "Signup"
            )}
          </Button>
          <div>
            Don't have an account?<span><Link to='/signup' className="text-blue-500"> Signup</Link></span>
          </div>
          {errormessage && (
            <Alert className="mt-5 " color="failure">
              {errormessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signin;
