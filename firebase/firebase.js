// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_m0IdrYGulFWDh6TRO4BH-WRTT45mMVA",
  authDomain: "streaming-fe5c6.firebaseapp.com",
  projectId: "streaming-fe5c6",
  storageBucket: "streaming-fe5c6.appspot.com",
  messagingSenderId: "283055978472",
  appId: "1:283055978472:web:4b4a6a9d7a5489e069565d",
  measurementId: "G-B2CPNXQMBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);