import React, { useState } from "react";
import "./CreatorReserveTap.css";

function CreatorReserveTap() {
  const [menuList, setMenuList] = useState([
    { id: Date.now(), text: "모두" },
    { id: Date.now(), text: "시리즈" },
    { id: Date.now(), text: "blue rain 제공" },
    { id: Date.now(), text: "관련 콘텐츠" },
    { id: Date.now(), text: "blue rain 제공" },
    { id: Date.now(), text: "관련 콘텐츠" },
    { id: Date.now(), text: "blue rain 제공" },
    { id: Date.now(), text: "관련 콘텐츠" },
  ]);
  const [video, setVideo] = useState([{
    title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    channelName: "by. 채널명",
    viewerCount: 11600000,
    uploadDate: "4년전",
    videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    timestamp: "1:13:41",
  }]);

  return (
    <section className='creator-reserve-container'>
      <div className='menu-section'>
        <span className='left-arrow'>{"<"}</span>
        <div className='menu-list'>
          {menuList.map((menu) => (
            <div className='menu-item' key={menu.id}>
              {menu.text}
            </div>
          ))}
        </div>
        <span className='right-arrow'>{">"}</span>
      </div>
      {video && video.length > 0 ? (
        video.map((video) => (
          <div className='video-section' key={video.id}>
            <div className='video-box'>
              <img src={video.videoSrc} alt="썸네일" className='video'></img>
              <span className='time-stamp'>{video.timestamp}</span>
            </div>
            <div className='video-details'>
              <div className='video-title'>{video.title}</div>
              <div className='channel-name'>{video.channelName}</div>
              <div className='video-info'>
                <span className='viewer-count'>{video.viewerCount}</span>
                <span className='upload-date'> {video.uploadDate}</span>
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

export default CreatorReserveTap;
