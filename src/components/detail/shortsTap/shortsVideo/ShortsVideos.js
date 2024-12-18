import React from 'react';
import formatViewerCount from "../../../../utils/formatViewerCount";
import "./ShortsVideo.css";

const ShortsVideos = ({shorts, handleShortsVideo, categoryBarRef}) => {
    return (
        <div className='shorts-list' ref={categoryBarRef}>
            {shorts.map((short, index) => (
                <figure className='shorts-item' key={index}>
                    <img
                        className='shorts-item-img'
                        src={short.thumbUrl}
                        alt='미리보기 이미지'
                        onClick={(event) => handleShortsVideo(short.id, event)}
                    />
                    <div className='shorts-item-info'>
              <span
                  onClick={(event) => handleShortsVideo(short.id, event)}
                  className='title'>{short.title}</span>
                        <span className='viewer-count'>
                조회수 {formatViewerCount(short.viewerCount)}
              </span>
                    </div>
                </figure>
            ))
            }
        </div>
    );
};

export default ShortsVideos;