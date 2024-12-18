import React, { useState, useEffect } from 'react';
import styles from './Listed-subscribe.module.css';
import GridSubscribe from '../grid/Grid-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';
import ShortsSubscribe from '../shorts/Shorts-subscribe';
import { fetchSubscriptionsVideos } from "../../../service/SubscribeService";
import { fetchShortsVideos } from "../../../service/SubscribeService";
import useNavigation from "../../../hooks/useNavigation";


const ListedSubscribe = () => {

    const [view, setView] = useState("list");
    const [shortsVisibleCount, setShortsVisibleCount] = useState(6);
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID
    const { link } = useNavigation();

    const [accessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    const [subscriptions, setSubscriptions] = useState([]);
    const [shorts, setShorts] = useState([]);

        
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
                console.log("내가 구독하는 video 갖고 왔다이!!!!! ",response);
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

    const handleShowVideo = (videoId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        link(`/detail?q=${videoId}`);
    };

    const handleChannelClick = (channelId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        window.location.href = `https://www.youtube.com/channel/${channelId}`;
    };

    return (
        <div className={styles.container}>

            {/* manage로 뷰 바뀌는 부분(헤더까지 바뀜 */}
            {view === "manage" && <ManageSubscribe />}
            {view === "grid" && <GridSubscribe />}
            {view === "shorts" && <ShortsSubscribe />}
            {view === "list" && (
                <>
                    <main className={styles.main}>
                        <section className={styles.videoSection}>
                            {subscriptions.map((video, index) => (
                                <>
                                    <article key={video.videoId} className={styles.videoClip}>
                                        <header className={styles.videoClip_header}>
                                            <div
                                                className={styles.header_channel}
                                                onClick={(event) => handleChannelClick(video.channelId, event)}
                                            >
                                                <img
                                                    src={video.channelAvatar}
                                                    alt='채널프로필사진' 
                                                />
                                                <h4>{video.channelTitle}</h4>
                                            </div>
                                            {index === 0 && (
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
                                                        <img alt='격자형' src={`${process.env.PUBLIC_URL}/grid_btn.svg`}/>
                                                    </button>
                                                    <button
                                                        className={styles.listButton}
                                                        onClick={() => setView("list")}
                                                    >
                                                        <img alt='리스트형' src={`${process.env.PUBLIC_URL}/list_btn.svg`}/>
                                                    </button>
                                                </div>
                                            )}
                                        </header>
                                        <div className={styles.videoClip_main}>
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
                                            <div className={styles.videoDescriptions_lines}>
                                                <div className={styles.videoTitle}>
                                                    <h5 onClick={(event) => handleShowVideo(video.videoId, event)}>
                                                        {video.title}
                                                    </h5>
                                                    <button>
                                                        <img src='/assets/subscribe/video-option-btn.svg' alt='영상옵션버튼'/>
                                                    </button>
                                                </div>
                                                <p className={styles.videoInfo} onClick={(event) => handleShowVideo(video.videoId, event)}>
                                                    {video.channelTitle}  {video.views} • {video.publishTime}
                                                </p>
                                                <p className={styles.videoDes} onClick={(event) => handleShowVideo(video.videoId, event)}>
                                                    {video.description}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                    {index === 0 && <section className={styles.shortsSection}>
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
                                            {shorts.slice(0, shortsVisibleCount).map((shorts, index) => (
                                                <article
                                                    key={index}
                                                    className={styles.shortsClip}
                                                    onClick={(event) => handleShowVideo(shorts.id, event)}
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
                                                        <div>
                                                            <h5>{shorts.title}</h5>
                                                            <p>조회수 {shorts.viewerCount}</p>
                                                        </div>
                                                        <button>
                                                            <img src='/assets/subscribe/video-option-btn.svg' alt='영상옵션버튼'/>
                                                        </button>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </section>}
                                </>
                            ))}
                        </section>
                    </main>
                </>
            )}
        </div>        
    );
};

export default ListedSubscribe;
