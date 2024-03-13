// UploadComponent.js

import React, { useState } from "react";
import uploadFileToFirebase from "./api/upload";

const UploadComponent = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    uploadFileToFirebase(file, setImgUrl, setProgresspercent);
  };

  return (
    <div className="container mx-auto px-4 md:px-10">
      <form onSubmit={handleSubmit} className='form' encType="multipart/form-data"> {/* Add encType attribute */}
        <div className="flex flex-col space-y-3">
          <label
            htmlFor="video-upload"
            className="my-4 font-medium font-bold text-2xl"
          >
            Upload a Video:
          </label>
          <input
            type="file"
            id="video-upload" /* Add id attribute */
            accept="video/*"
            className="border border-gray-300 bg-white px-2 py-1 rounded-lg text-sm focus:outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="bg-black w-fit text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out"
          >
            Upload Video
          </button>
        </div>
      </form>
      {!imgUrl && (
        <div
          className="outerbar mx-auto mt-6 px-8 md:px-32"
          style={{ maxWidth: "500px" }}
        >
          <div className="relative h-2 rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${progresspercent}%` }}
            ></div>
          </div>
          <div className="text-center mt-2">{progresspercent}%</div>
        </div>
      )}
      {imgUrl && (
        <div
          className="mx-auto mt-6 px-8 md:px-32"
          style={{ maxWidth: "500px" }}
        >
          <img src={imgUrl} alt="uploaded file" height={200} />
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
