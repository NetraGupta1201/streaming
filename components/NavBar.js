import React, { useState } from 'react';

// NavBar component
const NavBar = () => {
  // State for toggling mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // JSX for navigation bar
  return (
    <nav className="bg-gray-800 h-24 md:h-24 pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo and desktop navigation */}
          <div className="flex items-center pl-6 justify-center">
            <div className="flex-shrink-0 text-white text-lg md:text-xl">
              Logo
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Navigation links */}
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Movies
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  TV Shows
                </a>
              </div>
            </div>
          </div>
          {/* Mobile navigation */}
          <div className="md:hidden">
            <div className="flex justify-center items-center h-16">
              {/* Navigation links */}
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mx-2">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mx-2">
                Movies
              </a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mx-2">
                TV Shows
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar
