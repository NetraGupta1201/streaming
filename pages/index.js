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
          try {
            // Check if itemRef is a file (not a directory)
            if (itemRef.name.includes('.')) {
              const downloadUrl = await getDownloadURL(itemRef);
              let thumbnailUrl = downloadUrl; // Default to using the original file URL as the thumbnail URL
              
              // If the item is a video, get a thumbnail from it
              if (downloadUrl.endsWith('.mp4')) {
                thumbnailUrl = await generateVideoThumbnail(downloadUrl);
              }

              const metadata = await getMetadata(itemRef);
              const description = metadata.customMetadata?.description || 'No description available';
              const title = metadata.customMetadata?.title || 'No title available';
              return { downloadUrl, description, title, name: itemRef.name, thumbnailUrl }; // Assign title to the correct property
            }
          } catch (error) {
            console.error('Error fetching metadata for item:', error);
            // If there's an error fetching metadata, skip this item and continue
            return null;
          }
        });

        // Filter out null values (items for which metadata couldn't be fetched)
        const mediaItemsData = (await Promise.all(itemsPromises)).filter(item => item !== null);

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
                <img className="h-48 w-full object-cover md:h-full md:w-48" src={item.thumbnailUrl} alt="Thumbnail" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-800 font-semibold">{item.title}</div> {/* Display title */}
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

// Function to generate video thumbnail URL
async function generateVideoThumbnail(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous'; // Enable cross-origin access if needed

    // Event listener to handle when the video metadata is loaded
    video.addEventListener('loadeddata', async () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      // Draw the first frame of the video onto the canvas
      video.currentTime = 0; // Set to the beginning of the video
      await new Promise(resolve => {
        video.addEventListener('seeked', () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve();
        }, { once: true });
      });

      const thumbnailUrl = canvas.toDataURL('image/jpeg'); // Convert canvas to data URL
      resolve(thumbnailUrl);
    });

    // Event listener to handle errors during video loading
    video.addEventListener('error', (error) => {
      reject(error);
    });

    // Start loading the video
    video.load();
  });
}
