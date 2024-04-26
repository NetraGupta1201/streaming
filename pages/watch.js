import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Watch = () => {
  const router = useRouter();
  const { url } = router.query;
  const videoRef = useRef(null);

  const determineVideoQuality = () => {
    // Check if the browser supports the navigator.connection API
    if (navigator.connection) {
      const connection = navigator.connection;

      // Check if the network type is known and reliable
      if (connection.effectiveType && connection.downlink) {
        // Calculate the bandwidth in megabits per second (Mbps)
        const bandwidthMbps = connection.downlink * 8; // downlink is in megabits per second

        // Determine the video quality based on the available bandwidth
        if (bandwidthMbps < 2) {
          return '360p'; // Low quality for bandwidth less than 2 Mbps
        } else if (bandwidthMbps < 5) {
          return '480p'; // Medium quality for bandwidth between 2 and 5 Mbps
        } else if (bandwidthMbps < 10) {
          return '720p'; // High quality for bandwidth between 5 and 10 Mbps
        } else {
          return '1080p'; // Highest quality for bandwidth greater than 10 Mbps
        }
      }
    }

    // Return a default quality if network information is not available
    return '480p'; // Default to medium quality
  };

  useEffect(() => {
    if (url) {
      // Determine the quality based on network speed
      const quality = determineVideoQuality();

      // Request the transcoded video based on quality from backend
      const transcodedUrl = `/api/transcode?videoUrl=${encodeURIComponent(url)}&quality=${quality}`;

      // Initialize Video.js with the transcoded video URL
      const videoPlayer = videojs(videoRef.current, {
        controls: true,
        sources: [{ src: transcodedUrl, type: 'video/mp4' }],
        fluid: true // Makes the video player responsive
      });

      return () => {
        // Clean up the video player when component unmounts
        if (videoPlayer) {
          videoPlayer.dispose();
        }
      };
    }
  }, [url]);

  return (
    <div className="container mx-auto px-4 md:px-10 pt-20 flex justify-center items-center v-screen">
      <div
        data-vjs-player
        style={{ maxWidth: '100vw', maxHeight: 'calc(100vh - 100px)' }} // Adjusted for potential header/footer
      >
        <video
          ref={videoRef}
          className="video-js"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
    </div>
  );
};

export default Watch;
