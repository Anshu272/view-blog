import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import React from 'react';

const Footercomp = () => {
  return (
    <Footer className='w-[100%] border flex flex-col mt-5 border-teal-500 border-t-8 min-h-[30vh] box-border bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] '>
      {/* Footer Content */}
      <div className='px-4 sm:px-10 pt-5 pb-10 w-full'>
        {/* Logo */}
       <Link
             to={"/"}
             >
             <span className=" text-5xl font-bold text-blue-500">V</span>
             <span className='font-bold'>Blog</span>
           </Link>
        {/* Footer Links */}
        <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-8'>
          {/* Column 1 */}
          <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link href='/search'  className='cursor-pointer hover:text-blue-400'>
                Blogs 
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Column 2 */}
          <div>
            <Footer.Title title='Resources' />
            <Footer.LinkGroup col>
              <Footer.Link  className='cursor-pointer hover:text-blue-400' >
                Discord
              </Footer.Link>
              <Footer.Link  className='cursor-pointer hover:text-blue-400' >
                Instagram
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Column 3 */}
          <div>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
              <Footer.Link  className='cursor-pointer hover:text-blue-400'>
                Privacy Policy
              </Footer.Link>
              <Footer.Link   className='cursor-pointer hover:text-blue-400'>
                Terms & Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>

      {/* Divider */}
      <Footer.Divider />

      {/* Copyright and Social Icons */}
      <div className='w-full px-4 sm:px-10 pt-5 pb-5'>
        <div className='flex items-center justify-between'>
          {/* Copyright */}
          <Footer.Copyright
            by="ViewBlog"
            year={new Date().getFullYear()}
          />

          {/* Social Icons */}
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-start ">
            <Footer.Icon icon={BsFacebook} />
            <Footer.Icon icon={BsInstagram} />
            <Footer.Icon icon={BsTwitter} />
            <Footer.Icon icon={BsGithub} />
            <Footer.Icon icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footercomp;  