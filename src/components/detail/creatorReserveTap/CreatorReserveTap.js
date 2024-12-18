import React, { useContext, useEffect, useRef, useState } from "react";
import formatViewerCount from "../../../utils/formatViewerCount.js";
import "./CreatorReserveTap.css";
import { ThemeContext } from "../../context/context.js";
import { getMenuItemStyle } from "../../detail/themes/useThemeStyles.js";
import { fetchCreatorVideos } from "../../../utils/fetchCreatorVideos.js";
import useNavigation from "../../../hooks/useNavigation.js";
import DropdownMenu from "../../dropdownMenu/DropdownMenu"


function CreatorReserveTap({ channelId }) {
  const { isDark } = useContext(ThemeContext);
  // const setTheme = getStyle(isDark);
  const setMenuTheme = getMenuItemStyle(isDark);

  // 스크롤 이벤트를 위한 Ref
  const categoryBarRef = useRef(null);
  const { link } = useNavigation();
  const [openDropdown, setOpenDropdown] = useState(false); // 더보기 메뉴

  // 메뉴 리스트
  const menuList = [
    { id: 1, text: "모두" },
    { id: 2, text: "시리즈" },
    { id: 3, text: "blue rain 제공" },
    { id: 4, text: "관련 콘텐츠" },
    { id: 5, text: "blue rain 제공" },
    { id: 6, text: "관련 콘텐츠" },
    { id: 7, text: "blue rain 제공" },
    { id: 8, text: "관련 콘텐츠" },
  ]

  // 현재 선택된 메뉴
  const [menu, setMenu] = useState("");

  // 비디오 리스트
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchRelatedVideoList = async () => {
      const videoList = await fetchCreatorVideos(channelId);

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

  // 스크롤 이벤트
  const handleScroll = (direction) => {
    const scrollContainer = categoryBarRef.current;
    const scrollAmount = scrollContainer.clientWidth;
    if (direction === "left") {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right") {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 메뉴 클릭 이벤트
  const handleMenuClick = (e) => {
    const clickedElement = e.target;
    setMenu(clickedElement.innerText);
    console.log(clickedElement);

    // 모든 메뉴를 순회하면서 Clicked 클래스를 제거
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((menuItem) => {
      menuItem.classList.remove("clicked");
    });

    //Clicked 클래스를 추가
    clickedElement.classList.add("clicked");
  };

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
    <section className={`creator-reserve-container`}>
      <div className='menu-section'>
        <span onClick={() => handleScroll("left")} className={`left-arrow`}>
          {"<"}
        </span>
        <div className='menu-list' ref={categoryBarRef}>
          {menuList.map((menu) => (
            <div
              style={setMenuTheme}
              className={`menu-item`}
              key={menu.id}
              // ref={menuitem_ref}
              onClick={handleMenuClick}
            >
              {menu.text}
            </div>
          ))}
        </div>
        <span onClick={() => handleScroll("right")} className={`right-arrow`}>
          {">"}
        </span>
      </div>
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
