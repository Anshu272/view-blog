import React from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [formdata, setformdata] = useState({});
  const [errormessage, seterrormessage] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleform = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      return seterrormessage("Please fill out all fields.");
    }
    try {
      setloading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      setloading(false);
      if (res.ok) {
        navigate("/signin");
      }
      if (data.success === false) {
        return seterrormessage(data.errmsg);
      }
    } catch (error) {
      seterrormessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex justify-center pt-20 md:pt-60">
        <div className="text-white mb-10 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-full text-4xl md:text-5xl px-5 py-2.5 text-center font-extrabold w-4/5 md:w-1/2 h-1/5 md:h-[30%] lg:h-1/5 flex justify-center items-center">
          View Blog
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center pt-8 md:pt-[15vh] px-4 md:px-9">
        <form className="flex flex-col gap-4 w-full md:pl-14" onSubmit={handlesubmit}>
          <div className="w-full">
            <Label>Your Name</Label>
            <TextInput
              type="text"
              placeholder="Enter Your Name"
              className="w-full md:w-3/5"
              onChange={handleform}
              id="username"
            />
          </div>
          <div className="w-full">
            <Label>Email</Label>
            <TextInput
              type="email"
              placeholder="Enter Your Email"
              className="w-full md:w-3/5"
              onChange={handleform}
              id="email"
            />
          </div>
          <div className="w-full">
            <Label>Password</Label>
            <TextInput
              type="password"
              placeholder="Enter Your Password"
              className="w-full md:w-3/5"
              onChange={handleform}
              id="password"
            />
          </div>
          <Button
            className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg text-l px-5 py-2.5 text-center mt-4 text-white w-full md:w-3/5 h-12 flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="w-6 h-6 pr-2" />
                <span>Loading...</span>
              </>
            ) : (
              "Signup"
            )}
          </Button>
          <OAuth />
          <div className="mb-10">
            Already have an account?
            <span>
              <Link to="/signin" className="text-blue-500">
                Sign-in
              </Link>
            </span>
          </div>
          {errormessage && (
            <Alert className="mt-5" color="failure">
              {errormessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;