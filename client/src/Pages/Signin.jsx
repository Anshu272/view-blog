import React from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Signinfailure, Signinstart, Signinsuccess } from "../redux/user/userslice";
import OAuth from "../components/OAuth";

const Signin = () => {
  const [formdata, setformdata] = useState({});
  const { loading, error: errormessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleform = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      dispatch(Signinfailure("Please fill out all fields"));
      return;
    }
    try {
      dispatch(Signinstart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(Signinsuccess(data));
        navigate("/");
      } else {
        dispatch(Signinfailure(data.errmsg));
      }
    } catch (error) {
      dispatch(Signinfailure("Something went wrong"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handlesubmit}>
          {errormessage && (
            <Alert color="failure" className="mb-4">
              {errormessage}
            </Alert>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="email" value="Email address" />
              <TextInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                onChange={handleform}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                onChange={handleform}
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg text-l px-5 py-2.5 text-center text-white h-12"
          >
            {loading ? (
              <>
                <Spinner className="mr-2" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="w-[100%]">
            <OAuth />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;