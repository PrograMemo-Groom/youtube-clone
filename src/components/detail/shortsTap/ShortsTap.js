import React, {useContext, useEffect, useRef, useState} from "react";
import formatViewerCount from "../../../utils/formatViewerCount";
import "./ShortsTap.css";
import {ThemeContext} from "../../context/context";
import {getStyle} from "../themes/useThemeStyles";
import {fetchShortsVideos} from "../../../utils/fetchShortsVideos.js";
import useNavigation from "../../../hooks/useNavigation.js";
import ShortsVideos from "./shortsVideo/ShortsVideos.js";

function ShortsTap() {
    // const { isDark } = useContext(ThemeContext);
    // const setTheme = getStyle(isDark);
    // 스크롤 이벤트를 위한 Ref
    const categoryBarRef = useRef(null);
    const {link} = useNavigation();

    const [shorts, setShorts] = useState([]);

    // 쇼츠 비디오 정보 업데이트
    useEffect(() => {
        const fetchAndSetShorts = async () => {
            try {
                const shortsVideoList = await fetchShortsVideos("Faker"); // 데이터를 비동기적으로 가져옴
                console.log("shortsVideo", shortsVideoList);

                // 가져온 데이터를 필요한 형식으로 변환
                const formattedShorts = shortsVideoList.map((short) => ({
                    id: short.id.videoId, title: short.snippet.title, // 제목
                    viewerCount: short.viewerCount || 0, // 조회수 (없으면 0으로 설정)
                    thumbUrl: short.snippet.thumbnails.default.url, // 썸네일 URL
                }));

                // 상태 업데이트
                setShorts(formattedShorts);
            } catch (error) {
                console.error("Error fetching Shorts videos:", error);
            }
        };

        fetchAndSetShorts();
    }, []);

    // 스크롤 이벤트
    const handleScroll = (direction) => {
        const scrollContainer = categoryBarRef.current;
        // console.log(scrollContainer);
        const scrollAmount = scrollContainer.clientWidth;
        if (direction === "left") {
            scrollContainer.scrollBy({left: -scrollAmount, behavior: "smooth"});
        } else if (direction === "right") {
            scrollContainer.scrollBy({left: scrollAmount, behavior: "smooth"});
        }
    };

    // 해당 id의 쇼츠 페이지로 이동
    const handleShortsVideo = (videoId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        link(`/shorts?q=${videoId}`);
    };

    return (<div className='shortsTap-container'>
        <div className='shorts-header'>
            <img
                className='shorts-header-img'
                src='https://i.namu.wiki/i/LkKUWu-wSjxhbv9Nc1TeDv7cQVGAm9fb51bMED8S73h0495WomoGvYlS2pbfJAx14IEeHDyMJO85nKL2Q5cs4qgVW458GNv1F3aEghP0Pgb-iDX50RJI_rhRxsOpOCJqWmnEZk-3psmR7uYQu4Kzag.svg'
                alt='쇼츠 아이콘'
            />
            <span>Shorts</span>
        </div>

        <div className='left-arrow' onClick={() => handleScroll("left")}>
            {"<"}
        </div>
        <div className='right-arrow' onClick={() => handleScroll("right")}>
            {">"}
        </div>
        <ShortsVideos shorts={shorts} handleShortsVideo={handleShortsVideo} categoryBarRef={categoryBarRef}/>
    </div>);
}

export default ShortsTap;
