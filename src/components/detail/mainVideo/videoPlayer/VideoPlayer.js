import React from 'react';

const VideoPlayer = ({content}) => {
    return (
        <figure className='video-container'>
            <iframe
                width='560'
                height='315'
                src={content.videoSrc}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
            ></iframe>
        </figure>
    );
};

export default VideoPlayer;