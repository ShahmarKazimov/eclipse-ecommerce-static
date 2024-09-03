import React from 'react';
import "./footer.css";
import logo from "../../../src/assets/Eclipse-logo.png";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


const footer = () => {
  return (
    <footer className="mt-5 bg-gradient-to-r from-zinc-950 to-zinc-900 text-white">
      <div className="py-8">
        <div className="flex flex-wrap sm:w-[561px] md:w-[761px] lg:w-[961px] xl:w-[1271px] mx-auto">
          <div className="md:mb-0 mb-10 flex flex-col justify-between gap-y-5 w-full md:w-1/4 pl-5 mt-4 md:mt-0">
            <div className="w-20 max-w-full mx-auto sm:mx-0 md:mx-0">
              <a href="/" className="block w-full">
                <img
                  src={logo}
                  alt="logo"
                  className="hidden dark:block"
                />
              </a>
            </div>
            <div className="w-full justify-center sm:justify-start flex sm:w-max md:w-1/3 mt-4">
              <ul className="w-28 flex sm:mx-auto justify-center md:justify-end space-x-4 text-gray-400">
                <li><a className="hover:text-[#C4932C]" href="#"><FaFacebookF /></a></li>
                <li><a className="hover:text-[#C4932C]" href="#"><FaInstagram /></a></li>
                <li><a className="hover:text-[#C4932C]" href="#"><FaYoutube /></a></li>
                <li><a className="hover:text-[#C4932C]" href="#"><FaXTwitter /></a></li>
              </ul>
            </div>
            <div className='flex flex-col gap-y-3 items-center sm:items-start justify-center'>
              <h1 className='text-center text-gray-300 opacity-30 text-xs max-w-40 sm:text-start'>Find your dream watch for luxury watches.</h1>
              <a href="/watches" className="relative px-[75px] py-[22px] font-medium button-footer">
                <span className=''>
                  Shop Now
                </span>
                <span className="left-7 absolute inline-block whitespace-nowrap">Shop Now</span>
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mt-4 md:mt-0 text-center sm:text-start">
            <h6 className="text-xl font-semibold mb-2 text-[#C4932C]">Brands</h6>
            <ul className="list-none space-y-2">
              <li><a href="/rolex" className="hover:underline underline-offset-4 text-gray-400">Rolex</a></li>
              <li><a href="/cartier" className="hover:underline underline-offset-4 text-gray-400">Cartier</a></li>
              <li><a href="/hamilton" className="hover:underline underline-offset-4 text-gray-400">Hamilton</a></li>
              <li><a href="/hublot" className="hover:underline underline-offset-4 text-gray-400">Hublot</a></li>
              <li><a href="/ulysseNardin" className="hover:underline underline-offset-4 text-gray-400">Ulysse Nardin</a></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mt-4 md:mt-0 text-center sm:text-start">
            <h6 className="text-xl font-semibold mb-2 text-[#C4932C]">Special Watches</h6>
            <ul className="list-none space-y-2">
              <li><a href="https://www.youtube.com/watch?v=6i4hfLtps7s" className="hover:underline underline-offset-4 text-gray-400">Rolex Oyster Perpetual</a></li>
              <li><a href="https://www.youtube.com/watch?v=eZIG45LN5ws" className="hover:underline underline-offset-4 text-gray-400">Cartier De Santos</a></li>
              <li><a href="https://www.youtube.com/watch?v=uLx_t3xdYLQ" className="hover:underline underline-offset-4 text-gray-400">Hublot Big Bang</a></li>
              <li><a href="https://www.youtube.com/watch?v=DY0Oa-jktiM" className="hover:underline underline-offset-4 text-gray-400">Hamilton Jazzmaster</a></li>
            </ul>
          </div>

          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mt-4 md:mt-0 text-center sm:text-start">
            <h6 className="text-xl font-semibold mb-2 text-[#C4932C]">Quick Links</h6>
            <ul className="list-none space-y-2">
              <li><a href="/Watches" className="hover:underline underline-offset-4 text-gray-400">All Brands</a></li>
              <li><a href="/security" className="hover:underline underline-offset-4 text-gray-400">Certificates</a></li>
              <li><a href="/magazine" className="hover:underline underline-offset-4 text-gray-400">Blog</a></li>
              <li><a href="/faq" className="hover:underline underline-offset-4 text-gray-400">FAQ</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex justify-center items-center">
          <div className="w-full md:w-2/3 text-center md:text-left">
            <p className="text-sm text-gray-400 text-center">Copyright &copy; 2024 All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default footer