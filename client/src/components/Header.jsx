import { Avatar, Button, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMoon, AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toogletheme } from "../redux/theme/themeslice";
import { signoutSuccess } from "../redux/user/userslice";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div
      className={`flex flex-col pt-2 lg:px-5 px-2 border-b-2 ${
        isMobileMenuOpen ? "h-auto" : "h-20" // Adjust height based on mobile menu state
      } transition-all duration-300`}
    >
      {/* Top Section (Logo, Search, User Actions) */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to={"/"}
          className="pl-4"
          >
          <span className=" text-5xl text-blue-500">V</span>
          <span>Blog</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <NavLink to="/search">
          <Button className="w-10 h-8 lg:hidden text-gray " pill>
            <AiOutlineSearch />
          </Button>
        </NavLink>
              {/* Navigation Links (Desktop) */}
      <nav className="lg:flex gap-10 font-semibold text-md hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-gray-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/About"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-gray-500"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/Project"
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-gray-500"
          }
        >
          Project
        </NavLink>
      </nav>
        

        {/* User Actions */}
        <div className="flex justify-center items-center">
          <Button
            className="rounded-3xl lg:w-14 lg:h-10 w-10 h-8 flex justify-center  items-center mr-5"
            onClick={() => dispatch(toogletheme())}
          >
            <AiOutlineMoon className="w-7 p-1  h-7 fill-black dark:fill-white"  />
          </Button>
          {currentUser ? (
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center text-sm pe-1 mb-2 lg:border-solid lg:border-2 lg:w-48   px-3 py-2 border-none font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                type="button"
              >
                <span className="sr-only">Open user menu</span>
                <Avatar
                  img={
                    currentUser?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="User"
                  rounded={true}
                  className="w-10 h-10 lg:me-2"
                />
                <div className="lg:flex items-center hidden">
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
              </div>

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
                        onClick={()=>setIsDropdownOpen(false)}
                      >
                        Your Profile
                      </Link>
                    </li>
                  </ul>
                  <div
                    className="text-sm block px-4 py-2 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white"
                    onClick={handleSignout}
                  >
                    SignOut
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/signin"}>
              <Button className=" text-sm h-10 w-20 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg px-4 py-0.5 text-center  mb-2 my-3 text-white">
                Signin
              </Button>
            </Link>
          )}
        </div>

        {/* Hamburger Menu Toggle */}
        <div className="lg:hidden">
          <GiHamburgerMenu
            className="w-6 h-6 mr-2 cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>



      {/* Navigation Links (Mobile) */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden mt-4">
          <ul className="flex flex-col gap-4 font-semibold text-md mb-2 ">
            <li className="">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "text-gray-500"
                }
                onClick={toggleMobileMenu}
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
                onClick={toggleMobileMenu}
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
                onClick={toggleMobileMenu}
              >
                Project
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;