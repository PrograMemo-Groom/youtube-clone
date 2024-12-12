import React from "react";
import "./MainVideo.css";

function MainVideo() {
  return (
    <div className='mainVideo-container'>
      <div className="video-container">
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/rZ3tsvTqeZ0?si=-SH64CToqfeVyIfP'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerpolicy='strict-origin-when-cross-origin'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default MainVideo;
