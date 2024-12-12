import React, { useContext, useState } from "react";
import "./RelatedVideo.css";
import formatViewerCount from "../../../utils/formatViewerCount";
// import {getStyle, getMenuItemStyle} from "../../detail/themes/useThemeStyles.js";
// import { ThemeContext } from "../../context/context.js";

function RelatedVideo() {
  // const { isDark } = useContext(ThemeContext);
  // const setTheme = getStyle(isDark);


  const [video, setVideo] = useState([
    {
      title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
      channelName: "by. 채널명",
      viewerCount: 1600000,
      uploadDate: "4년전",
      videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
      timestamp: "1:13:41",
    },
    {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },
      {
        title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
        channelName: "by. 채널명",
        viewerCount: 1600000,
        uploadDate: "4년전",
        videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
        timestamp: "1:13:41",
      },

  ]);

  return (
    <section className={`relatedVideo-container`}>
      {video && video.length > 0 ? (
        video.map((video, index) => (
          <div className='video-section' key={index}>
            <div className='video-box'>
              <img src={video.videoSrc} alt='썸네일' className='video'></img>
              <span className='time-stamp'>{video.timestamp}</span>
            </div>
            <div className='video-details'>
              <div className={`video-title`}>
                {video.title}
              </div>
              <div className='channel-name'>{video.channelName}</div>
              <div className='video-info'>
                <span className='viewer-count'>
                  {formatViewerCount(video.viewerCount)}•{video.uploadDate}
                </span>
              </div>

              <img
                className='more-btn'
                src='assets/icon/more_btn.svg'
                alt='영상 더보기'
              />
            </div>
          </div>
        ))
      ) : (
        <div>비디오가 없습니다.</div>
      )}
    </section>
  );
}

export default RelatedVideo;
