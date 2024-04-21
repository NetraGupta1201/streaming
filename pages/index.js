// frontend file (Home.js)
import { useState } from "react";
import useSWR from "swr";
import Link from 'next/link';
import { fetchMediaItems } from "../components/backend/index";

export default function Home() {
  const [error, setError] = useState(null);
  const { data: mediaItems, error: fetchError } = useSWR("mediaItems", fetchMediaItems);

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>; // Access error message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Access error message
  }

  if (!mediaItems) {
    return <div>Loading...</div>;
  }

  const handleDownload = (downloadUrl, title) => {
    const fileExtension = downloadUrl.split('.').pop();
    const filename = title ? `${title}.${fileExtension}` : `video.${fileExtension}`;
  
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = filename;
    anchor.click();
  };

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
