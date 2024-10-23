import { Button, Navbar,NavbarCollapse,NavbarLink,TextInput } from 'flowbite-react'
import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { AiOutlineMoon, AiOutlineSearch } from 'react-icons/ai';

const Header = () => {
  return (
    <div className='flex  justify-between pt-3 px-5 items-center border-b-2'>
      <Link to={"/"} className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800  rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2  font-bold'> ViewBlog </Link>
      <form>
        <TextInput type='text'  placeholder='Search...'  className='rounded-lg my-3 hidden lg:inline '>

        </TextInput>
        <Button className=' rounded-3xl w-16 h-10 flex justify-center items-center  lg:hidden'>
          <AiOutlineSearch className='w-7 h-7 fill-black'/> 
        </Button>

      </form>

      <ul className='flex gap-10 font-semibold text-md'>
      <li>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? 'text-blue-500' : 'text-gray-500' // Change active and inactive styles here
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/About" 
          className={({ isActive }) => 
            isActive ? 'text-blue-500' : 'text-gray-500'
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/Project" 
          className={({ isActive }) => 
            isActive ? 'text-blue-500' : 'text-gray-500'
          }
        >
          Project
        </NavLink>
      </li>
    </ul>

      <div className='flex justify-center items-center'>
        <Button className=' rounded-3xl w-14 h-10 flex justify-center items-center bg-gray-300'>
          <AiOutlineMoon className='w-7 h-7 fill-black'/>
        </Button>
        <Button className=' bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-extrabold rounded-lg text-l px-5 py-2.5 text-center me-2 mb-2 m-3 text-white'>
          SignIn
        </Button>
      </div>
    </div>
    

  )
}

export default Header
