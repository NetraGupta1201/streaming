import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Watch = () => {
  const router = useRouter();
  const { url } = router.query;
  const videoRef = useRef(null);

  useEffect(() => {
    if (url) {
      const videoPlayer = videojs(videoRef.current, {
        controls: true,
        sources: [{ src: url, type: 'video/mp4' }],
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
