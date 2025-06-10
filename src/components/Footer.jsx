import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      {/* Top Footer Content */}
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        {/* Left - Logo & Description */}
        <div>
          <img src={assets.logo} alt="QuickBlog Logo" className='w-32 sm:w-44' />
          <p className='max-w-[410px] mt-6'>
            Discover insightful blogs and curated content from passionate writers. Explore stories, tips, and updates across tech, lifestyle, creativity, and more — all in one place.
          </p>
        </div>

        {/* Right - Links */}
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i) => (
                <li key={i}>
                    <a href="#" className="relative inline-block text-gray-600 hover:text-primary transition duration-300 group">
                    {link}
                    <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-all duration-300"></span>
                    </a>                  
                </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Centered Copyright */}
      <div className='py-4 text-center text-sm md:text-base text-gray-500/80'>
        Copyright 2025 © <strong>QuickBlog</strong> – All Right Reserved.
      </div>
    </div>
  )
}

export default Footer
