import React from "react";

const YouTubePlayer = ({ videoId }) => {
  return (
    <div>
      <iframe
        className="w-auto h-auto"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubePlayer;
