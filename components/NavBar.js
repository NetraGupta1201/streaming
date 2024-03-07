import React, { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-gray-800 h-24 md:h-24 pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center pl-6 justify-center">
            <div className="flex-shrink-0 text-white text-lg md:text-xl"> {/* Increased font size for logo */}
              Logo
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" 
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" // No changes for desktop navigation
                >
                  Home
                </a>
                <a href="#" 
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" // No changes for desktop navigation
                >
                  Movies
                </a>
                <a href="#" 
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" // No changes for desktop navigation
                >
                  TV Shows
                </a>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsOpen(!isOpen)}
              type="button" 
              className={`bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300 ${isOpen || isHovered ? 'text-white bg-gray-700' : 'hover:text-white hover:bg-gray-700'}`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-40 z-50 flex justify-start">
          <div className="w-2/5 bg-gray-800 h-full overflow-y-auto">
            <div className="px-4 py-6">
              <a href="#" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:rounded-full transition-colors duration-300" // Added hover effect for mobile navigation
              >
                Home
              </a>
              <a href="#" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:rounded-full transition-colors duration-300" // Added hover effect for mobile navigation
              >
                Movies
              </a>
              <a href="#" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:rounded-full transition-colors duration-300" // Added hover effect for mobile navigation
              >
                TV Shows
              </a>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="fixed top-0 left-0 w-full h-full bg-transparent z-40"></button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
