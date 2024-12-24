import React, {useEffect} from "react";
import {getMenuItemStyle, getStyle,} from "../themes/useThemeStyles";
import "./MainVideo.css";
import VideoPlayer from "./videoPlayer/VideoPlayer";
import VideoDetail from "./videoDetail/VideoDetail";
import Comments from "./comments/Comments";
import {useDispatch, useSelector} from "react-redux";
import {fetchChannelInfo} from "../../../store/actions/DetailActions";

function MainVideo() {
    const {isDark, videoData, content} = useSelector(state => state.detail);

    const setMenuTheme = getMenuItemStyle(isDark);
    const setTheme = getStyle(isDark);
    const dispatch = useDispatch();

    const videoId = videoData.id;

    // 비디오 정보 업데이트
    useEffect(() => {
        dispatch(fetchChannelInfo(videoId, videoData));
    }, [dispatch, videoData])


    return (
        <section className='mainVideo-container'>
            <VideoPlayer/>
            <VideoDetail setMenuTheme={setMenuTheme} videoId={videoId}/>
            <Comments setTheme={setTheme}/>
        </section>
    );
}

export default MainVideo;
