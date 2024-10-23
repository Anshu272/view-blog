import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import React from 'react'

const Footercomp = () => {
  return (
    <Footer className='w-[100%] border border-teal-500 border-t-8 h-[30vh] box-border '>
 <div className='pl-10 pt-10 pb-10'> 
 <Link to={"/"} className='text-white  bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800  rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2  font-bold'> ViewBlog </Link>
        <div className='grid grid-cols-3 mt-10 '>
            <div>
            <Footer.Title title='About' />
           <Footer.LinkGroup col>
            <Footer.Link href='https://www.google.com'>
                100 Js Projects
            </Footer.Link>
             <Footer.Link href='https://www.google.com'>
                100 Js Projects
            </Footer.Link>
           </Footer.LinkGroup>

            </div>
            <div>
            <Footer.Title title='About' />
           <Footer.LinkGroup col>
            <Footer.Link href='https://www.google.com'>
                100 Js Projects
            </Footer.Link>
             <Footer.Link href='https://www.google.com'>
                100 Js Projects
            </Footer.Link>
           </Footer.LinkGroup>

            </div>
            <div>
            <Footer.Title title='About' />
           <Footer.LinkGroup col>
            <Footer.Link href='https://www.google.com'>
                100 Js Projects
            </Footer.Link>
             <Footer.Link href='https://www.google.com'>
                100 Js Projects
            </Footer.Link>
           </Footer.LinkGroup>

            </div>
        </div>
 </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between px-10 pt-5'>
          <Footer.Copyright
            href='#'
            by="ViewBlog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='#' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
          </div>

    </Footer>

  )
}

export default Footercomp
