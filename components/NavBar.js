import React, { useState } from 'react'
import Link from 'next/link'

// NavBar component
const NavBar = () => {
  // State for toggling mobile menu
  const [isOpen, setIsOpen] = useState(false)

  // JSX for navigation bar
  return (
    <nav className="bg-gray-800 h-24 md:h-24 pt-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo and navigation */}
          <div className="flex items-center pl-6 justify-center">
            <div className="flex-shrink-0 text-white text-lg md:text-xl">
              Logo
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Navigation links with Link */}
              <Link href= "/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href= "/upload" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Upload
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
