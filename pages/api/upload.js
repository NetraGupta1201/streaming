import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from './firebase';

const uploadFileToFirebase = (file, setImgUrl, setProgresspercent, description) => { // Step 1: Accept description parameter
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
        // Step 2: Pass description to setImgUrl callback
        setImgUrl(downloadURL, description);
      });
    }
  );
};

export default uploadFileToFirebase;
