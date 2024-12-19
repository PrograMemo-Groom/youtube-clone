import React, {useEffect} from "react";
import CreatorReserveTap from "./creatorReserveTap/CreatorReserveTap";
import ShortsTap from "./shortsTap/ShortsTap";
import MainVideo from "./mainVideo/MainVideo";
import "./Detail.css";
import {getStyle} from "./themes/useThemeStyles";
import {useSearchParams} from "react-router-dom";
import RelatedVideo from "./relatedVideo/RelatedVideo";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideoDetail} from "../../store/actions/DetailActions"


function Detail() {
    const dispatch = useDispatch();
    const {isDark, videoData} = useSelector(state => state.detail);

    const [searchParams] = useSearchParams(); // URL 파라미터 가져오기
    const videoId = searchParams.get("q"); // 'p' 파라미터의 값
    const setTheme = getStyle(isDark);
    // const setMenuTheme = getMenuItemStyle(isDark);


    // 메인 영상 세팅
    useEffect(() => {
        dispatch(fetchVideoDetail(videoId));
    }, [dispatch, videoId]);

    if (!videoData) {
        return <div>영상 정보를 불러오는 중...</div>;
    }

    return (

        <div style={setTheme} className='detail-container'>
            <div className='main-section'>
                <MainVideo/>
            </div>
            <div style={setTheme} className='side-section'>
                <CreatorReserveTap/>
                <ShortsTap/>
                <RelatedVideo/>
            </div>
        </div>
    );
}

export default Detail;
