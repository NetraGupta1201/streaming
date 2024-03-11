import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className='container mx-auto px-4 md:px-10'>
        <h1 HTMLfor="video-upload" className="my-4 font-medium font-bold text-2xl">Browse Videos</h1>
      </div>
    </>
  );
}
