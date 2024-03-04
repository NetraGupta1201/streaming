import React from 'react'

const NavBar = () => {
  return (
<nav class="bg-gray-800 py-4">
    <div class="container mx-auto flex justify-between items-center">
        <a href="#" class="text-white font-bold text-xl">Your Video Streaming Website</a>
        <div class="flex items-center space-x-4 lg:space-x-8">
            <ul class="hidden lg:flex space-x-4">
                <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
                <li><a href="#" class="text-white hover:text-gray-300">Movies</a></li>
                <li><a href="#" class="text-white hover:text-gray-300">TV Shows</a></li>
                <li><a href="#" class="text-white hover:text-gray-300">Categories</a></li>
            </ul>
            <button class="text-white focus:outline-none lg:hidden">
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5C2 4.44772 2.44772 4 3 4H21C21.5523 4 22 4.44772 22 5C22 5.55228 21.5523 6 21 6H3C2.44772 6 2 5.55228 2 5ZM3 10C2.44772 10 2 10.4477 2 11C2 11.5523 2.44772 12 3 12H21C21.5523 12 22 11.5523 22 11C22 10.4477 21.5523 10 21 10H3ZM3 18C2.44772 18 2 18.4477 2 19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H3Z"></path>
                </svg>
            </button>
        </div>
    </div>
    <div class="lg:hidden mt-4 px-4">
        <ul class="text-white">
            <li><a href="#" class="block py-2 px-4 border-b border-gray-700">Home</a></li>
            <li><a href="#" class="block py-2 px-4 border-b border-gray-700">Movies</a></li>
            <li><a href="#" class="block py-2 px-4 border-b border-gray-700">TV Shows</a></li>
            <li><a href="#" class="block py-2 px-4 border-b border-gray-700">Categories</a></li>
        </ul>
    </div>

    </nav>
  )
}

export default NavBar