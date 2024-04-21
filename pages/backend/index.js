import { getDownloadURL, getMetadata, listAll, ref, getStorage } from "firebase/storage";

const storage = getStorage();

export async function fetchMediaItems() {
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
}

async function generateVideoThumbnail(videoUrl) {
  // Add your video thumbnail generation logic here
}
