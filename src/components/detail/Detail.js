import React, { useEffect, useState } from "react";
import CreatorReserveTap from "./creatorReserveTap/CreatorReserveTap";
import ShortsTap from "./shortsTap/ShortsTap";
import RelatedVideo from "./relatedVideo/RelatedVideo";
import MainVideo from "./mainVideo/MainVideo";
import "./Detail.css";
import { ThemeContext } from "../context/context";
import { getMenuItemStyle, getStyle } from "./themes/useThemeStyles";
import { useSearchParams } from "react-router-dom";
import instance from "../../api/api";
import requests from "../../api/endpoint";
// import { fetchVideoDetail } from "../../service/VideoService";

function Detail() {
  const [isDark, setIsDark] = useState(false);

  const [searchParams] = useSearchParams(); // URL 파라미터 가져오기
  const videoId = searchParams.get("q"); // 'p' 파라미터의 값
  const [channelId, setChannelId] = useState(false); // 채널 ID 저장
  const [videoData, setVideoData] = useState(null); // 영상 정보 저장

  const setTheme = getStyle(isDark);
  // const setMenuTheme = getMenuItemStyle(isDark);

  // 메인 영상 세팅
  useEffect(() => {
    const fetchVideoDetail = async () => {
      if (!videoId) return; // videoId가 없으면 요청 안 함

      try {
        const response = await instance.get(requests.fetchPopularVideos, {
          params: {
            part: "snippet,statistics,contentDetails,player",
            id: videoId,
          },
        });

        if (response.data.items.length > 0) {
          setVideoData(response.data.items[0]); // 영상 데이터 저장
          setChannelId(response.data.items[0].snippet.channelId); // 채널 ID 저장
        }
      } catch (error) {
        console.error("영상 정보를 가져오는 중 오류 발생:", error.message);
      }
    };

    fetchVideoDetail();
  }, [videoId]);

  if (!videoData) {
    return <div>영상 정보를 불러오는 중...</div>;
  }

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div style={setTheme} className='detail-container'>
        <div className='main-section'>
          <MainVideo video={videoData} channelId={channelId}/>
        </div>
        <div style={setTheme} className='side-section'>
          <CreatorReserveTap channelId={channelId}/>
          <ShortsTap />
          <RelatedVideo channelId={channelId}/>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Detail;
