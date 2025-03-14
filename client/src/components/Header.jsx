import { Avatar, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMoon, AiOutlineSearch } from "react-icons/ai";
import { useSelector,useDispatch } from "react-redux";
import { toogletheme } from "../redux/theme/themeslice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between pt-2 px-5 items-center border-b-2">
      <Link
        to={"/"}
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 font-bold"
      >
        ViewBlog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          className="rounded-lg my-3 hidden lg:inline"
        />
        <Button className="rounded-3xl w-16 h-10 flex justify-center items-center lg:hidden">
          <AiOutlineSearch className="w-7 h-7 fill-black" />
        </Button>
      </form>

      <ul className="flex gap-10 font-semibold text-md">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Project"
            className={({ isActive }) =>
              isActive ? "text-blue-500" : "text-gray-500"
            }
          >
            Project
          </NavLink>
        </li>
      </ul>

      <div className="flex justify-center items-center">
        <Button className="rounded-3xl w-14 h-10 flex justify-center items-center mr-5" onClick={()=>dispatch(toogletheme())}>
          <AiOutlineMoon className="w-7 h-7 fill-black dark:fill-white" />
        </Button>
        {currentUser ? (
          <div className="relative">
            <Button
              onClick={toggleDropdown}
              className="flex items-center text-sm pe-1 mb-2   font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
              type="button"
            >
              <span className="sr-only">Open user menu</span>
              <Avatar
                img={
                  currentUser?.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="User "
                rounded={true}
                className="w-10 h-10 me-2"
              />
              <div className="flex items-center">
                <span className="mr-2">{currentUser?.username}</span>
                <svg
                  className="w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div className="truncate">
                    {currentUser?.email || "name@flowbite.com"}
                  </div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      to="/dashboard?tab=profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={'/signin'}>
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg  px-4 py-0.5 text-center me-2 mb-2 m-3 text-white">
              Signin
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
