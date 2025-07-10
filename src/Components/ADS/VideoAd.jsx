const VideoAd = ({ src }) => {
  return (
    <div className="my-4 w-full flex justify-center">
      <video
        src={src}
        controls
        muted
        autoPlay
        loop
        className="w-full max-w-md rounded shadow"
      />
    </div>
  );
};

export default VideoAd;
