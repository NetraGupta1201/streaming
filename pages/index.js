import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

const storage = getStorage();

export default function Home() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const storageRef = ref(storage, 'files');
        const filesList = await listAll(storageRef);
        const itemsPromises = filesList.items.map(async (itemRef) => {
          const downloadUrl = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef); // Fetch metadata directly
          const description = metadata.customMetadata?.description || 'No description available';
          return { downloadUrl, description, name: itemRef.name }; // Include name of the file
        });
        const mediaItemsData = await Promise.all(itemsPromises);
        setMediaItems(mediaItemsData);
      } catch (error) {
        console.error('Error fetching media items:', error);
        setError('Error fetching media items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-10">
      <h1 className="my-4 font-medium font-bold text-2xl">Browse Videos</h1>
      <div className="cards">
        {mediaItems.map((item, index) => (
          <div key={index} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                {item.downloadUrl.endsWith('.mp4') ? (
                  <video controls className="h-48 w-full object-cover md:h-full md:w-48">
                    <source src={item.downloadUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img className="h-48 w-full object-cover md:h-full md:w-48" src={item.downloadUrl} alt="Media Item" />
                )}
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-800 font-semibold">{item.name}</div> {/* Display file name */}
                <p className="mt-2 text-gray-800">{item.description}</p>
                <div className="mt-4">
                  <a href={item.downloadUrl} className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg mr-2">Watch/View</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
