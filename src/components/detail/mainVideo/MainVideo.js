import React, {useContext, useEffect, useState} from "react";
import he from "he";
import {ThemeContext} from "../../context/context.js";
import {
    getStyle,
    getMenuItemStyle,
} from "../themes/useThemeStyles";
import "./MainVideo.css";
import {getChannelThumbnail} from "../../../utils/formatProfileImage.js";
import {getChannelSubscriberCount} from "../../../utils/getChannelSubscriberCount.js";
import VideoPlayer from "./videoPlayer/VideoPlayer";
import VideoDetail from "./videoDetail/VideoDetail";
import Comments from "./comments/Comments";

function MainVideo({video, channelId}) {
    const {isDark} = useContext(ThemeContext);
    const setMenuTheme = getMenuItemStyle(isDark);
    const setTheme = getStyle(isDark);


    const [content, setContent] = useState({
        videoSrc: "",
        title: "",
        channel: "",
        channelSubscribers: "",
        channelImgUrl: "",
        text: "",
        views: 0,
        uploadDate: "",
        like: 0,
    });


    const videoId = video.id;

    // 비디오 정보 업데이트
    useEffect(() => {
        const {snippet, statistics} = video;

        const fetchChannelInfo = async () => {
            // 비동기적으로 채널 썸네일 가져오기
            const channelImgUrl = await getChannelThumbnail(snippet.channelId);
            // 비동기적으로 구독자수 가져오기
            const channelSubscribers = await getChannelSubscriberCount(
                snippet.channelId
            );

            // content 업데이트
            const videoDetail = {
                videoSrc: `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`,
                title: snippet.title,
                channel: snippet.channelTitle,
                channelSubscribers: channelSubscribers || "N/A",
                channelImgUrl, // 비동기적으로 가져온 썸네일 사용
                text: he.decode(snippet.description) || "", // 텍스트가 없을 경우 빈 문자열로 설정
                views: statistics.viewCount,
                uploadDate: snippet.publishedAt,
                comments: statistics.commentCount,
                likes: statistics.likeCount,
                hate: "N/A", // hateCount API에 없음
                timestamp: new Date(snippet.publishedAt).toLocaleString(),
            };

            setContent(videoDetail);
        };

        fetchChannelInfo();
    }, [video]);

    return (
        <section className='mainVideo-container'>
            <VideoPlayer content={content}/>
            <VideoDetail content={content} channelId={channelId} setMenuTheme={setMenuTheme}
                         video={video} videoId={videoId}/>
            <Comments videoId={videoId} video={video} setTheme={setTheme} content={content}/>
        </section>
    );
}

export default MainVideo;
