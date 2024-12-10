import React, { useState } from "react";
import "./CreatorReserveTap.css";

function CreatorReserveTap() {
  const dark = "dark";
  const light = "light";

  // true는 Light Mode, false는 Dark Mode
  const [theme, setTheme] = useState(true);
  
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
  const [video, setVideo] = useState([
    {
      title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
      channelName: "by. 채널명",
      viewerCount: 1600000,
      uploadDate: "4년전",
      videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
      timestamp: "1:13:41",
    },
  ]);

  function formatViewerCount(count) {
    if (count < 10000) {
      return `${count}회`; // 1만 미만은 그대로 표시
    }
    const formattedCount = (count / 10000).toFixed(); // 1만 단위로 나누고 소수점 1자리까지 표시
    return `${formattedCount}만회`;
  }

  return (
    <section className={`creator-reserve-container ${theme? light : dark}`}>
      <div className='menu-section'>
        <span className={`left-arrow ${theme? light : dark}`}>{"<"}</span>
        <div className='menu-list'>
          {menuList.map((menu) => (
            <div className={`menu-item ${theme? light : dark}`} key={menu.id}>
              {menu.text}
            </div>
          ))}
        </div>
        <span className={`right-arrow ${theme? light : dark}`}>{">"}</span>
      </div>
      {video && video.length > 0 ? (
        video.map((video) => (
          <div className='video-section' key={video.id}>
            <div className='video-box'>
              <img src={video.videoSrc} alt='썸네일' className='video'></img>
              <span className='time-stamp'>{video.timestamp}</span>
            </div>
            <div className='video-details'>
              <div className={`video-title ${theme? light : dark}`}>{video.title}</div>
              <div className='channel-name'>{video.channelName}</div>
              <div className='video-info'>
                <span className='viewer-count'>
                  {formatViewerCount(video.viewerCount)}
                </span>
                <span className='upload-date'> {video.uploadDate}</span>
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

export default CreatorReserveTap;
