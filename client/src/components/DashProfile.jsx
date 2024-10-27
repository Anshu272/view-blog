import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className=" pl-5 w-full pr-5 pt-8 ">
      <form className="w-full h-full flex flex-col items-center gap-6">
        <div className="font-bold text-4xl">Profile</div>
        <div className="w-32 h-32  rounded-full object-contain border-2 border-gray-400 dark:border-white ">
          <img
            src={currentUser.profilePicture}
            className="w-full h-full rounded-full"
          />
        </div>
        <TextInput
          type="text"
          placeholder="Username"
          className="w-[90%] max-w-[600px] "
        />
        <TextInput
          type="email"
          placeholder="Email"
          className="w-[90%] max-w-[600px] "
        />
        <TextInput
          type="password"
          placeholder="Password"
          className="w-[90%] max-w-[600px] "
        />
        <Button className="w-[90%] max-w-[600px] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg  px-4 py-0.5 text-center   text-white">
          Update
        </Button>
        <div className="text-red-00 flex w-[90%] max-w-[600px] justify-between ">
          <p>Delete Account</p>
          <p>Sign Out</p>

        </div>
      </form>
    </div>
  );
}
