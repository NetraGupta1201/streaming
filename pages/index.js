// frontend file (Home.js)
import { useState } from "react";
import useSWR from "swr";
import Link from 'next/link';
import { fetchMediaItems } from "./api/index";

export default function Home() {
  const [error, setError] = useState(null);

  // Fetch media items with caching
  const { data: mediaItems, error: fetchError } = useSWR("mediaItems", fetchMediaItems);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mediaItems) {
    return <div>Loading...</div>;
  }

  const handleDownload = (downloadUrl, title) => {
    // Extract the file extension from the download URL
    const fileExtension = downloadUrl.split('.').pop();
    // Set the filename based on the video title or a default filename
    const filename = title ? `${title}.${fileExtension}` : `video.${fileExtension}`;
  
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = filename; // Set the filename
    anchor.click();
  };
// below would work but throws CORS error, can be fixed on firebase rules only
  // const handleDownload = async (downloadUrl, title) => {
  //   try {
  //     const response = await fetch(downloadUrl);
  //     const blob = await response.blob();
  
  //     // Create a URL for the blob
  //     const blobUrl = window.URL.createObjectURL(blob);
  
  //     // Create a hidden anchor element
  //     const a = document.createElement('a');
  //     a.style.display = 'none';
  //     document.body.appendChild(a);
  
  //     // Set the href and download attributes
  //     a.href = blobUrl;
  //     a.download = title ? `${title}.mp4` : 'video.mp4';
  
  //     // Trigger the click event on the anchor element
  //     a.click();
  
  //     // Remove the anchor element
  //     document.body.removeChild(a);
  
  //     // Revoke the URL to release memory
  //     window.URL.revokeObjectURL(blobUrl);
  //   } catch (error) {
  //     console.error('Error downloading file:', error);
  //   }
  // };
  

  return (
    <div className="container mx-auto px-4 md:px-10">
      <h1 className="my-4 font-medium font-bold text-2xl">Browse Videos</h1>
      <div className="cards">
        {mediaItems.map((item, index) => (
          <div key={index} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-48" src={item.thumbnailUrl} alt="Thumbnail" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-800 font-semibold">{item.title}</div>
                <p className="mt-2 text-gray-800">{item.description}</p>
                <div className="mt-4">
                  <Link href={`/watch?url=${encodeURIComponent(item.downloadUrl)}`}>
                    <button className="bg-green-800 text-white px-4 py-2 rounded-lg mr-2">Watch/View</button>
                  </Link>
                  <button onClick={() => handleDownload(item.downloadUrl, item.title)} className="bg-indigo-900 text-white px-4 py-2 rounded-lg mr-2">Download</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
