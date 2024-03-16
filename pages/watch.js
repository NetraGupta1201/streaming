import { useRouter } from 'next/router';

const Watch = () => {
  const router = useRouter();
  const { url } = router.query;

  const isVideo = url && /\.(mp4|mov|avi|wmv|flv)/i.test(url);

  return (
    <div className="container mx-auto px-4 md:px-10 pt-20 flex justify-center items-center v-screen">
      {isVideo ? (
        <video controls className="max-w-full max-h-full">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={url} alt="Image" className="max-w-full max-h-full" />
      )}
    </div>
  );
}

export default Watch;
