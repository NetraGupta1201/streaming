import { ref, getDownloadURL, uploadBytesResumable, updateMetadata } from "firebase/storage";
import { storage } from './firebase';

const uploadFileToFirebase = (file, setImgUrl, setProgresspercent, description, title) => {
  // Generate a unique filename based on the current timestamp
  const timestamp = Date.now();
  const uniqueFilename = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `files/${uniqueFilename}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgresspercent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const metadata = {
          customMetadata: {
            description: description,
            title: title
          }
        };
        updateMetadata(uploadTask.snapshot.ref, metadata)
          .then(() => {
            setImgUrl(downloadURL, description);
          })
          .catch((error) => {
            console.error('Error updating metadata:', error);
          });
      });
    }
  );
};

export default uploadFileToFirebase;
