import React from 'react';
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="relative w-full flex md:justify-center justify-between items-center flex-col p-6 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg-footer "></div>
      
    

      {/* Glowing Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Main Content Row */}
        <div className="w-full flex sm:flex-row flex-col justify-between items-center my-6">
          {/* Logo Section */}
          <div className="flex flex-[0.5] justify-center items-center group">
            <div className="relative p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 ">
              <div className="w-32 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-500">
               <img src={logo} alt="logo" className="w-32" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-8 w-full gap-4">
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
              <div key={item} className="relative group">
                <p className="text-white text-base text-center relative cursor-pointer   hover:text-gray-200 transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[2px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[2px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]">
                  {item}
                </p>
             
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="flex justify-center items-center flex-col mt-8 space-y-3">
          <div className="relative group">
            <p className="text-white text-sm text-center px-6 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm border border-purple-500/20 group-hover:border-cyan-400/40 transition-all duration-500 hover:scale-105">
              Come join us and hear for the unexpected miracle
            </p>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-cyan-600/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          <div className="relative group cursor-pointer">
            <p className="text-cyan-300 text-sm text-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-900/20 to-purple-900/20 backdrop-blur-sm border border-cyan-500/30 hover:border-purple-400/50 transition-all duration-300 hover:text-purple-300 hover:scale-105">
              info@kryptomastery.com
            </p>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600/10 to-purple-600/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        
        {/* Animated Divider */}
        <div className="relative sm:w-[90%] w-full mx-auto mt-8 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 opacity-0 animate-pulse"></div>
          {/* Moving dot */}
          <div className="absolute top-0 w-2 h-px bg-cyan-400 animate-ping"></div>
        </div>
        
        {/* Footer Bottom */}
        <div className="sm:w-[90%] w-full mx-auto flex justify-between items-center">
          <div className="relative group">
            <p className="text-gray-300 text-sm text-center px-3 py-1 rounded-md hover:text-white transition-colors duration-300 hover:bg-white/5">
              @kryptomastery 2025
            </p>
          </div>
          <div className="relative group">
            <p className="text-gray-300 text-sm text-center px-3 py-1 rounded-md hover:text-white transition-colors duration-300 hover:bg-white/5">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm"></div>
      </div>
  );
};

export default Footer;