import React, { useState, useEffect } from 'react';
import styles from './Grid-subscribe.module.css';
import ListedSubscribe from '../list/Listed-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';
import ShortsSubscribe from '../shorts/Shorts-subscribe';
import { fetchSubscriptionsVideos } from "../../../service/SubscribeService";
import { fetchShortsVideos } from "../../../service/SubscribeService";


const GridSubscribe = () => {
    const [view, setView] = useState("grid");
    const [itemsPerRow, setItemsPerRow] = useState(4); // 기본값: 4개
    const [shortsVisibleCount, setShortsVisibleCount] = useState(6);
    const [subscriptions, setSubscriptions] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID

    const [accessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    
        useEffect(() => {
            accessToken && fetchData();
        }, [accessToken]);

        const fetchData = async () => {
            try {
                if(!accessToken) {
                    console.log("token없다이!!발급버튼 눌러서 발급받아라이!!");
                    return;
                }
                const response = await fetchSubscriptionsVideos(accessToken);  // 구독 비디오오오
                if (Array.isArray(response)) {
                    console.log('내가 가져온 동영상들 배열성공 !!');
                    const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
                    const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
                        return new Date(b.publishTime) - new Date(a.publishTime);
                    });
                    setSubscriptions(sortedResponse);
                } else {
                    console.error("받아온게 배열이 아님.. 이거임:", response);
                }
            } catch (error) {
                console.log('fetchData 에러 :', error);
            }
        }

        // 쇼츠 비디오 정보 업데이트
        useEffect(() => {
        const fetchAndSetShorts = async () => {
            try {
            const shortsVideoList = await fetchShortsVideos("귀여운 강아지 쇼츠"); // 데이터를 비동기적으로 가져옴
            console.log("shortsVideo", shortsVideoList);

            // 상태 업데이트
            setShorts(shortsVideoList);
            } catch (error) {
            console.error("Error fetching Shorts videos:", error);
            }
        };
        fetchAndSetShorts();
    }, []);


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
                            {subscriptions.map((video, index) => (
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
                                            <img src={video.channelAvatar} alt="채널프로필사진" />
                                            <div className={styles.videoDescriptions_lines}>
                                                <h4>{video.title}</h4>
                                                <p>{video.channelTitle}</p>
                                                <p>{video.views} • {video.publishTime}</p>
                                            </div>
                                            <div className={styles.videoDescriptions_button}>
                                                <button>
                                                    <img src="/assets/subscribe/video-option-btn.svg" alt="영상옵션버튼" />
                                                </button>
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
                                                    <article key={shortsIndex} className={styles.shortsClip}>
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
                                                            <div>
                                                                <h5>{shorts.title}</h5>
                                                                <p>조회수 {shorts.viewerCount}</p>
                                                            </div>
                                                            <button>
                                                                <img src="/assets/subscribe/video-option-btn.svg" alt="영상옵션버튼" />
                                                            </button>
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


