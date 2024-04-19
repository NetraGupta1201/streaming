import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { app } from "./api/firebase"; // Import the Firebase app instance only
import NavBar from '@/components/NavBar';
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  // Initialize Firebase only once when the app mounts
  useEffect(() => {
    // Make sure Firebase is initialized only once
    if (!app.length) {
      // If the Firebase app instance doesn't exist, initialize Firebase
      initializeApp(app.options); // Initialize with the options from the already initialized app instance
    }
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default App;
