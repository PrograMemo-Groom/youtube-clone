import React, { useContext, useEffect, useState } from "react";
import "./RelatedVideo.css";
import formatViewerCount from "../../../utils/formatViewerCount";
// import {getStyle, getMenuItemStyle} from "../../detail/themes/useThemeStyles.js";
import { ThemeContext } from "../../context/context.js";
import { fetchCreatorVideos } from "../../../utils/fetchCreatorVideos.js";
import useNavigation from "../../../hooks/useNavigation.js";
import DropdownMenu from "../../dropdownMenu/DropdownMenu"

function RelatedVideo({ channelId }) {
  const { isDark } = useContext(ThemeContext);
  // const setTheme = getStyle(isDark);
  const { link } = useNavigation();
  const [openDropdown, setOpenDropdown] = useState(null); // 더보기 메뉴

  const [video, setVideo] = useState([]);

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

  const handleChannelClick = (channelId, event) => {
    if (event) event.stopPropagation(); // 이벤트 버블링 방지
    window.open(`https://www.youtube.com/channel/${channelId}`, "_blank");
  };

  const toggleDropdown = (videoId) => {
    setOpenDropdown((prev) => (prev === videoId ? null : videoId));
    console.log("videoId", videoId);
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
              <div
                onClick={(event) => handleChannelClick(channelId, event)}
                className='channel-name'
              >
                {video.channelName}
              </div>
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
                  onClick={() => toggleDropdown(video.id)}
                />
              ) : (
                <img
                  className='more-btn'
                  src='assets/icon/more_btn_black.svg'
                  alt='영상 더보기'
                  onClick={() => toggleDropdown(video.id)}
                />
              )}
              {openDropdown === video.id && (
                <DropdownMenu />
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
