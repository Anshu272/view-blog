import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import React from 'react';

const Footercomp = () => {
  return (
    <Footer className='w-[100%] border flex flex-col border-teal-500 border-t-8 min-h-[30vh] box-border bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
      {/* Footer Content */}
      <div className='px-4 sm:px-10 pt-10 pb-10 w-full'>
        {/* Logo */}
        <Link
          to={"/"}
          className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 font-bold'
        >
          ViewBlog
        </Link>

        {/* Footer Links */}
        <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-8'>
          {/* Column 1 */}
          <div>
            <Footer.Title title='About' />
            <Footer.LinkGroup col>
              <Footer.Link href=''>
                100 Js Projects
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Column 2 */}
          <div>
            <Footer.Title title='Resources' />
            <Footer.LinkGroup col>
              <Footer.Link href=''>
                Discord
              </Footer.Link>
              <Footer.Link href=''>
                Instagram
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Column 3 */}
          <div>
            <Footer.Title title='Legal' />
            <Footer.LinkGroup col>
              <Footer.Link href=''>
                Privacy Policy
              </Footer.Link>
              <Footer.Link href=''>
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
            href='#'
            by="ViewBlog"
            year={new Date().getFullYear()}
          />

          {/* Social Icons */}
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-start">
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footercomp;  