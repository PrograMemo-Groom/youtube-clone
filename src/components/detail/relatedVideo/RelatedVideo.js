import React, { useState } from "react";
import "./RelatedVideo.css";
import formatViewerCount from "../../../utils/formatViewerCount";

function RelatedVideo() {

  const dark = "dark";
  const light = "light";
  // true는 Light Mode, false는 Dark Mode
  const [theme, setTheme] = useState(true);
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
    <section className={`relatedVideo-container ${theme ? light : dark}`}>
      {video && video.length > 0 ? (
        video.map((video, index) => (
          <div className='video-section' key={index}>
            <div className='video-box'>
              <img src={video.videoSrc} alt='썸네일' className='video'></img>
              <span className='time-stamp'>{video.timestamp}</span>
            </div>
            <div className='video-details'>
              <div className={`video-title ${theme ? light : dark}`}>
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
            {/* 테마 변경 테스트 */}
            {/* <button onClick={() => setTheme(!theme)}>딸깍</button> */}
          </div>
        ))
      ) : (
        <div>비디오가 없습니다.</div>
      )}
    </section>
  );
}

export default RelatedVideo;
