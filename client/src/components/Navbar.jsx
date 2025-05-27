import React, { useState } from 'react';
import logo from "../../images/logo.png";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavbarItem = ({ title, classprops }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classprops}`}>
      {title}
    </li>
  )
}
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial ">
        {
          ["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
            <NavbarItem key={item + index} title={item} classprops={`relative  hover:text-gray-200 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]`}/>
          ))
        }
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {
          toggleMenu ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} /> : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />
        }
        {
          toggleMenu && (
            <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] shadow-2xl md:hidden h-screen md:h-auto list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
              <li className='text-xl w-full my-2 '>
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
               { ["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
              <NavbarItem key={item + index} title={item}  classprops="my-2 text-lg"/>
              ))}
            </ul>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar; 
