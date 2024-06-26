import React, { useState, useEffect } from "react";
import uploadFileToFirebase from "../components/backend/upload";

const UploadComponent = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState(""); // State to store the title

  useEffect(() => {
    if (progressPercent === 100) {
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }, [progressPercent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    if (!file) return;
    uploadFileToFirebase(file, (url, uploadedDescription) => {
      setFileUrl(url);
      console.log("Uploaded description:", uploadedDescription);
    }, setProgressPercent, description, title); // Pass title to upload function
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 md:px-10">
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <div className="flex flex-col space-y-3">
          <label htmlFor="file-upload" className="my-4 font-medium font-bold text-2xl">Upload a File:</label>
          <input type="file" id="file-upload" accept="video/*,image/*" className="border border-gray-300 bg-white px-2 py-1 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
          <input type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} className="border border-gray-300 bg-white px-2 py-1 rounded-lg text-sm focus:outline-none focus:border-gray-400" /> {/* Input field for title */}
          <input type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} className="border border-gray-300 bg-white px-2 py-1 rounded-lg text-sm focus:outline-none focus:border-gray-400" />
          <button type="submit" className="bg-black w-fit text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-200 ease-in-out">Upload File</button>
        </div>
      </form>
      {!fileUrl && (
        <div className="outerbar mx-auto mt-6 px-8 md:px-32" style={{ maxWidth: "500px" }}>
          <div className="relative h-2 rounded-full bg-gray-200">
            <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="text-center mt-2">{progressPercent}%</div>
        </div>
      )}
      {fileUrl && (
        <div className="mx-auto mt-6 px-8 md:px-32" style={{ maxWidth: "500px" }}>
          <img src={fileUrl} alt="uploaded file" height={200} />
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
