import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className='container mx-auto px-4 md:px-10'>
        <h1 htmlFor="video-upload" className="my-4 font-medium font-bold text-2xl">Browse Videos</h1>
        <div className="cards">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://jacobson.lab.indiana.edu/wp-content/uploads/2018/04/video_thumbnail.png" alt="Video Thumbnail"/>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-800 font-semibold">Video Title</div>
                <p className="mt-2 text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="mt-4">
                  <a href="#" className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg mr-2">Watch Video</a>
                  <a href="#" className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg">Download Video</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
