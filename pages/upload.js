import React from 'react'

const Upload = () => {
  return (
    <div className='container mx-auto px-4 md:px-10'>
      <div className='flex flex-col space-y-3'>
        <label htmlFor ="video-upload" className="my-4 font-medium font-bold text-2xl">Upload a Video:</label>
        <input type="file" accept="video/*" className="border border-gray-300 bg-white px-2 py-1 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
        <button type="submit" className="bg-black w-fit text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out">
          Upload Video
        </button>
      </div>
    </div>
  )
}


export default Upload