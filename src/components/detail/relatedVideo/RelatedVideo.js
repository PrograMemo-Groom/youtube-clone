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
  const [openDropdown, setOpenDropdown] = useState(null); // 더보기 메뉴

  const [video, setVideo] = useState([
    // {
    //   title: "잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음",
    //   channelName: "by. 채널명",
    //   viewerCount: 1600000,
    //   uploadDate: "4년전",
    //   videoSrc: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    //   timestamp: "1:13:41",
    // },
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
                <div className='dropdownMenu'>
                  <ul>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/playlist.svg`}
                        alt='현재 재생목록에 추가'
                        className='menuIcon'
                      />
                      현재 재생목록에 추가
                    </li>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/clock.svg`}
                        alt='나중에 볼 동영상에 저장'
                        className='menuIcon'
                      />
                      나중에 볼 동영상에 저장
                    </li>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/bookmark.svg`}
                        alt='재생목록에 저장'
                        className='menuIcon'
                      />
                      재생목록에 저장
                    </li>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/download.svg`}
                        alt='오프라인 저장'
                        className='menuIcon'
                      />
                      오프라인 저장
                    </li>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/share.svg`}
                        alt='공유'
                        className='menuIcon'
                      />
                      공유
                    </li>
                    <hr className='menuDivider' />
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/wrong.svg`}
                        alt='관심 없음'
                        className='menuIcon'
                      />
                      관심 없음
                    </li>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/no.svg`}
                        alt='채널 추천 안함'
                        className='menuIcon'
                      />
                      채널 추천 안함
                    </li>
                    <li>
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/flag.svg`}
                        alt='신고'
                        className='menuIcon'
                      />
                      신고
                    </li>
                  </ul>
                </div>
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
