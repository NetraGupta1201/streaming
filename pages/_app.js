import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { app , firebaseConfig } from "./api/firebase"; // Import your Firebase configuration and app instance
import NavBar from '@/components/NavBar';
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  // Initialize Firebase only once when the app mounts
  useEffect(() => {
    // Make sure Firebase is initialized only once
    if (!app.length) {
      // Initialize Firebase
      // No need to store the app instance in a variable as it's already exported
      initializeApp(firebaseConfig);
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
