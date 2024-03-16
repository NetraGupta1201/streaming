import { ref, getDownloadURL, uploadBytesResumable, updateMetadata } from "firebase/storage";
import { storage } from './firebase';

const uploadFileToFirebase = (file, setImgUrl, setProgresspercent, description, title) => {
  const storageRef = ref(storage, `files/${file.name}`);
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
