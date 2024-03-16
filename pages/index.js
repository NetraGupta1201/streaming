import { useState } from "react";
import useSWR from "swr";
import { getDownloadURL, getMetadata, listAll, ref, getStorage } from "firebase/storage";
import Link from 'next/link';

const storage = getStorage();

export default function Home() {
  const [error, setError] = useState(null);

  // Fetch media items with caching
  const { data: mediaItems, error: fetchError } = useSWR("mediaItems", async () => {
    try {
      const storageRef = ref(storage, 'files');
      const filesList = await listAll(storageRef);
      const itemsPromises = filesList.items.map(async (itemRef) => {
        try {
          if (itemRef.name.includes('.')) {
            const downloadUrl = await getDownloadURL(itemRef);
            let thumbnailUrl = downloadUrl;
            if (downloadUrl.endsWith('.mp4')) {
              thumbnailUrl = await generateVideoThumbnail(downloadUrl);
            }
            const metadata = await getMetadata(itemRef);
            const description = metadata.customMetadata?.description || 'No description available';
            const title = metadata.customMetadata?.title || 'No title available';
            return { downloadUrl, description, title, name: itemRef.name, thumbnailUrl };
          }
        } catch (error) {
          console.error('Error fetching metadata for item:', error);
          return null;
        }
      });
      const mediaItemsData = (await Promise.all(itemsPromises)).filter(item => item !== null);
      return mediaItemsData;
    } catch (error) {
      console.error('Error fetching media items:', error);
      setError('Error fetching media items. Please try again later.');
      throw error; // Throw error to trigger error handling in useSWR
    }
  });

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mediaItems) {
    return <div>Loading...</div>;
  }

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
                  <a href={item.downloadUrl} download className="bg-indigo-900 text-white px-4 py-2 rounded-lg mr-2">Download</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function generateVideoThumbnail(videoUrl) {
  // Add your video thumbnail generation logic here
}
