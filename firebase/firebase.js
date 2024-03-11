// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

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

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase
