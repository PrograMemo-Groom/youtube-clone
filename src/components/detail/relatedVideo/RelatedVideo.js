import React, { useContext, useEffect, useState } from "react";
import "./RelatedVideo.css";
import formatViewerCount from "../../../utils/formatViewerCount";
// import {getStyle, getMenuItemStyle} from "../../detail/themes/useThemeStyles.js";
import { ThemeContext } from "../../context/context.js";
import { fetchCreatorVideos } from "../creatorReserveTap/fetchCreatorVideos.js";
import useNavigation from "../../../hooks/useNavigation.js";

function RelatedVideo({ channelId }) {
  const { isDark } = useContext(ThemeContext);
  // const setTheme = getStyle(isDark);
  const { link } = useNavigation();

  const [video, setVideo] = useState([
    // {
    //   title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //   channelName: "by. 채널명",
    //   viewerCount: 1600000,
    //   uploadDate: "4년전",
    //   videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //   timestamp: "1:13:41",
    // },
    // {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
    //   {
    //     title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //     channelName: "by. 채널명",
    //     viewerCount: 1600000,
    //     uploadDate: "4년전",
    //     videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //     timestamp: "1:13:41",
    //   },
  ]);

  useEffect(() => {
    const fetchRelatedVideoList = async () => {
      const videoList = await fetchCreatorVideos(channelId, 5); //5개만 가져오기

      const formatVideoData = videoList.map((video) => {
        return {
          id: video.videoId,
          title: video.title,
          channelName: video.channelTitle,
          viewerCount: video.viewCount || 0,
          uploadDate: video.uploadedAt || "",
          videoSrc: video.thumbnail || "",
          timestamp: video.duration,
          videoLink: video.videoLink || "",
        };
      });
      console.log("비디오 리스트", formatVideoData);
      setVideo(formatVideoData);
    };
    fetchRelatedVideoList();
  }, []);

  const handleShowVideo = (videoId, event) => {
    if (event) event.stopPropagation(); // 이벤트 버블링 방지
    link(`/detail?q=${videoId}`);
  };

  return (
    <section className={`relatedVideo-container`}>
      {video && video.length > 0 ? (
        video.map((video, index) => (
          <div className='video-section' key={index}>
            <div
              onClick={(event) => handleShowVideo(video.id, event)}
              className='video-box'
            >
              <img src={video.videoSrc} alt='썸네일' className='video'></img>
              <span className='time-stamp'>{video.timestamp}</span>
            </div>
            <div className='video-details'>
              <div className={`video-title`}>{video.title}</div>
              <div className='channel-name'>{video.channelName}</div>
              <div className='video-info'>
                <span className='viewer-count'>
                  {formatViewerCount(video.viewerCount)}•{video.uploadDate}
                </span>
              </div>

              {isDark ? (
                <img
                  className='more-btn'
                  src='assets/icon/more_btn.svg'
                  alt='영상 더보기'
                />
              ) : (
                <img
                  className='more-btn'
                  src='assets/icon/more_btn_black.svg'
                  alt='영상 더보기'
                />
              )}
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
