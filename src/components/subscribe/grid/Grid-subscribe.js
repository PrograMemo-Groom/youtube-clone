import React, { useState, useEffect } from 'react';
import styles from './Grid-subscribe.module.css';
import ListedSubscribe from '../list/Listed-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';
import ShortsSubscribe from '../shorts/Shorts-subscribe';
import useNavigation from "../../../hooks/useNavigation";
import DropdownMenu from "../dropdown-menu/DropdownMenu";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubscribeVideos,fetchSubscribeShorts} from "../../../store/actions/subscribeAction";

const GridSubscribe = () => {
    const [view, setView] = useState("grid");
    const [itemsPerRow, setItemsPerRow] = useState(4); // 기본값: 4개
    const [shortsVisibleCount, setShortsVisibleCount] = useState(6);
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID
    const { link } = useNavigation();
    const [openDropdown, setOpenDropdown] = useState(null); // 더보기 메뉴
    const [accessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    const dispatch = useDispatch();
    const { videos, shorts} = useSelector((state) => state.subscribe);
    

    useEffect(() => {
        accessToken && dispatch(fetchSubscribeVideos(accessToken));
    }, [dispatch, accessToken]);

    useEffect(()=> {
        dispatch(fetchSubscribeShorts());
    }, [dispatch]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 750) {
                setShortsVisibleCount(2);
            } else if (window.innerWidth < 1010) {
                setShortsVisibleCount(3);
            } else if (window.innerWidth < 1230) {
                setShortsVisibleCount(4);
            } else if (window.innerWidth < 1440) {
                setShortsVisibleCount(5);
            } else {
                setShortsVisibleCount(6);
            }
        };

        // 초기 화면 크기 확인
        handleResize();
        // 리스너 추가
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;

            let calculatedItemsPerRow = 1; // 기본값: 1열
            if (width >= 1421) {
                calculatedItemsPerRow = 4;
            } else if (width >= 1101 && width <= 1420) {
                calculatedItemsPerRow = 3;
            } else if (width >= 701 && width <= 1100) {
                calculatedItemsPerRow = 2;
            }

            setItemsPerRow(calculatedItemsPerRow);
        };

        // 리사이즈 이벤트 추가
        updateItemsPerRow();
        window.addEventListener("resize", updateItemsPerRow);

        return () => window.removeEventListener("resize", updateItemsPerRow);
    }, []);


    const threshold = itemsPerRow * 2; // 2줄 기준 계산

    const handleShowVideo = (videoId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        link(`/detail?q=${videoId}`);
    };

    const handleChannelClick = (channelId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        window.location.href = `https://www.youtube.com/channel/${channelId}`;
    };

    const toggleDropdown = (videoId) => {
        setOpenDropdown((prev) => (prev === videoId ? null : videoId));
    };

    
    return (
        <div className={styles.container}>
            {view === "manage" && <ManageSubscribe />}
            {view === "list" && <ListedSubscribe />}
            {view === "shorts" && <ShortsSubscribe />}
            {view === "grid" && (
                <>
                    <header className={styles.header}>
                        <h3>최신순</h3>
                        <div className={styles.pageChangeButtons}>
                            <button
                                className={styles.manageButton}
                                onClick={() => setView("manage")}
                            >
                                관리
                            </button>
                            <button
                                className={styles.gridButton}
                                onClick={() => setView("grid")}
                            >
                                <img alt="격자형" src={`${process.env.PUBLIC_URL}/grid_btn.svg`}/>
                            </button>
                            <button
                                className={styles.listButton}
                                onClick={() => setView("list")}
                            >
                                <img alt="리스트형" src={`${process.env.PUBLIC_URL}/list_btn.svg`}/>
                            </button>
                        </div>
                    </header>

                    <main className={styles.main}>
                        <section className={styles.videoSection}>
                            {videos.map((video, index) => (
                                <React.Fragment key={index}> {/* 기존에 여러 요소를 반환할 수 있도록 추가 */}
                                    <article className={styles.videoClip}>
                                        <div
                                            className={styles.videoThumbnail}
                                            onMouseEnter={() => setHoveredVideo(video.videoId)}
                                            onMouseLeave={() => setHoveredVideo(null)}
                                        >
                                            {hoveredVideo === video.videoId ? (
                                                    <iframe
                                                        className={styles.videoPlayer}
                                                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1`}
                                                        title={video.title}
                                                        allow="autoplay; encrypted-media"
                                                        allowFullScreen
                                                    ></iframe>
                                                ) : (
                                                    <img src={video.highThumbnail} alt='나는 썸네일' />
                                                )}
                                            <p>{video.duration}</p>
                                        </div>
                                        <div className={styles.videoDescriptions}>
                                            <img
                                                src={video.channelAvatar}
                                                alt="채널프로필사진"
                                                onClick={(event) => handleChannelClick(video.channelId, event)}
                                            />
                                            <div
                                                className={styles.videoDescriptions_lines}
                                                onClick={(event) => handleShowVideo(video.videoId, event)}
                                            >
                                                <h4>{video.title}</h4>
                                                <p>{video.channelTitle}</p>
                                                <p>{video.views} • {video.publishTime}</p>
                                            </div>
                                            <div style={{position: "relative"}}>
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/assets/icon/more_btn_black.svg`}
                                                    alt="more"
                                                    className={styles.more}
                                                    onClick={() => toggleDropdown(video.videoId)}
                                                />
                                                {openDropdown === video.videoId && (
                                                    <DropdownMenu />
                                                )}
                                            </div>
                                        </div>
                                    </article>

                                    {index === threshold - 1 && ( /* 2줄 기준 threshold에서 Shorts 섹션 렌더링 */
                                        <section className={styles.shortsSection}>
                                            <header className={styles.shortsHeader}>
                                                <div className={styles.shortsLogo}>
                                                    <img alt="로고" src={`${process.env.PUBLIC_URL}/Youtube_shorts_icon.svg`} />
                                                    <h4>Shorts</h4>
                                                </div>
                                                <button
                                                onClick={() => setView("shorts")}
                                                >
                                                    모두 보기
                                                </button>
                                            </header>
                                            <div className={styles.shortsMain}>
                                                {shorts.slice(0, shortsVisibleCount).map((shorts, shortsIndex) => (
                                                    <article
                                                        key={shortsIndex}
                                                        className={styles.shortsClip}
                                                    >
                                                        <div
                                                            className={styles.shortsThumbnail_div}
                                                            onMouseEnter={() => setHoveredVideo(shorts.id)}
                                                            onMouseLeave={() => setHoveredVideo(null)}
                                                        >
                                                            {hoveredVideo === shorts.id ? (
                                                                    <iframe
                                                                    className={styles.shortsPlayer}
                                                                    src={`https://www.youtube.com/embed/${shorts.id}?autoplay=1&mute=1`}
                                                                    title={shorts.title}
                                                                    allow="autoplay; encrypted-media"
                                                                    allowFullScreen
                                                                    ></iframe>
                                                                ) : (
                                                                    <img
                                                                    className={styles.shortsThumbnail}
                                                                    alt="shorts 썸네일"
                                                                    src={shorts.thumbUrl}
                                                                    />
                                                            )}
                                                        </div>
                                                        <div className={styles.shortsDetail}>
                                                            <div onClick={(event) => handleShowVideo(shorts.id, event)}>
                                                                <h5>{shorts.title}</h5>
                                                                <p>조회수 {shorts.viewerCount}</p>
                                                            </div>
                                                            <div style={{position: "relative"}}>
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/assets/icon/more_btn_black.svg`}
                                                                    alt="shorts more"
                                                                    className={styles.shorts_more}
                                                                    onClick={() => toggleDropdown(shorts.id)}
                                                                />
                                                                {openDropdown === shorts.id && (
                                                                    <DropdownMenu />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                {/* react fragment 종료 */}
                                </React.Fragment> 
                            ))}
                        </section>
                    </main>

                </>
            )}
        </div>
    );
};

export default GridSubscribe;


