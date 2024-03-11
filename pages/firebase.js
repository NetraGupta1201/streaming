// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA_m0IdrYGulFWDh6TRO4BH-WRTT45mMVA",
  authDomain: "streaming-fe5c6.firebaseapp.com",
  projectId: "streaming-fe5c6",
  storageBucket: "streaming-fe5c6.appspot.com",
  messagingSenderId: "283055978472",
  appId: "1:283055978472:web:4b4a6a9d7a5489e069565d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);