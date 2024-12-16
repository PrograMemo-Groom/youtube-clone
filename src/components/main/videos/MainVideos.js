import React, { useEffect, useState, useRef } from "react";
import styles from "./MainVideos.module.css";
import { getMainVideos } from "../../../service/MainService";
import useNavigation from "../../../hooks/useNavigation";

const MainVideos = ({ fetchFunction }) => {
    const [videos, setVideos] = useState([]); // 비디오 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID
    const [openDropdown, setOpenDropdown] = useState(null); // 더보기 메뉴
    const { link } = useNavigation();
    const observerRef = useRef(null); // Intersection Observer를 위한 ref
    const scrollPositionRef = useRef(0); // 스크롤 위치 추적
    const [nextPageToken, setNextPageToken] = useState(null);

    const normalizeThumbnails = (videos) => {
        return videos.map((video) => {
            const defaultThumbnail = "https://via.placeholder.com/1280x720?text=No+Thumbnail"; // 기본 썸네일 URL

            return {
                ...video,
                thumbnail: video.thumbnail || defaultThumbnail, // 썸네일 없으면 기본값
            };
        });
    };

    const fetchVideos = async (fetchFunction, pageToken = null) => {
        try {
            setLoading(true);
            let videoData;

            if (Array.isArray(fetchFunction)) {
                videoData = fetchFunction;
            } else {
                const response = await getMainVideos(fetchFunction, pageToken);
                videoData = response.videos;
                setNextPageToken(response.nextPageToken);
            }

            const normalizedVideos = normalizeThumbnails(videoData);
            setVideos((prev) => (pageToken ? [...prev, ...normalizedVideos] : normalizedVideos)); // 기존 데이터에 새 데이터 추가
        } catch (e) {
            console.error("Error fetching videos:", e.message);
            setError("동영상을 불러오는 중 문제가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // fetchFunction 변경 시 데이터 새로 로드
    useEffect(() => {
        setVideos([]); // 이전 데이터 초기화
        setNextPageToken(null); // 페이지 토큰 초기화
        fetchVideos(fetchFunction);
    }, [fetchFunction]);

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextPageToken && !loading) {
                    // 스크롤 위치 저장
                    scrollPositionRef.current = window.scrollY; // 현재 스크롤 위치 저장
                    fetchVideos(fetchFunction, nextPageToken);
                }
            },
            { threshold: 0.1 } // 요소가 10% 이상 보이면 트리거
        );

        const currentRef = observerRef.current; // 현재 ref 복사
        if (currentRef) observer.observe(currentRef); // observer 연결

        return () => {
            if (currentRef) observer.unobserve(currentRef); // observer 해제
        };
    }, [nextPageToken, loading, fetchFunction]);

    // 스크롤 위치 복원
    useEffect(() => {
        if (!loading) {
            window.scrollTo(0, scrollPositionRef.current); // 이전 스크롤 위치로 복원
        }
    }, [videos]); // videos 상태가 업데이트될 때 실행

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

    if (loading) {
        return <div className={styles.loading}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <>
            <div className={styles.videoGrid}>
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className={styles.videoPreview}
                        onMouseEnter={() => setHoveredVideo(video.videoId)}
                        onMouseLeave={() => setHoveredVideo(null)}
                    >
                        <div className={styles.thumbnailRow}>
                            {hoveredVideo === video.videoId ? (
                                <iframe
                                    className={styles.videoPlayer}
                                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1`}
                                    title={video.title}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img
                                    className={styles.thumbnail}
                                    alt={video.title}
                                    src={video.thumbnail}
                                />
                            )}
                            <div className={styles.videoTime}>{video.time}</div>
                        </div>
                        <div className={styles.videoInfoGrid}>
                            <div className={styles.channelPicture}>
                                <img
                                    className={styles.profilePicture}
                                    alt="channel profile"
                                    src={video.profile}
                                    onClick={(event) => handleChannelClick(video.channelId, event)} // 유저 프로필 클릭 이벤트 추가
                                />
                            </div>
                            <div className={styles.videoInfo}>
                                <div className={styles.titleRow}>
                                    <p
                                        className={styles.videoTitle}
                                        onClick={(event) => handleShowVideo(video.videoId, event)}
                                    >
                                        {video.title}
                                    </p>
                                    <div style={{position: "relative"}}>
                                        <img
                                            src={`${process.env.PUBLIC_URL}/assets/icon/more_btn_black.svg`}
                                            alt="more"
                                            className={styles.more}
                                            onClick={() => toggleDropdown(video.videoId)}
                                        />
                                        {openDropdown === video.videoId && (
                                            <div className={styles.dropdownMenu}>
                                                <ul>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/playlist.svg`}
                                                            alt="현재 재생목록에 추가"
                                                            className={styles.menuIcon}
                                                        />
                                                        현재 재생목록에 추가
                                                    </li>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/clock.svg`}
                                                            alt="나중에 볼 동영상에 저장"
                                                            className={styles.menuIcon}
                                                        />
                                                        나중에 볼 동영상에 저장
                                                    </li>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/bookmark.svg`}
                                                            alt="재생목록에 저장"
                                                            className={styles.menuIcon}
                                                        />
                                                        재생목록에 저장
                                                    </li>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/download.svg`}
                                                            alt="오프라인 저장"
                                                            className={styles.menuIcon}
                                                        />
                                                        오프라인 저장
                                                    </li>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/share.svg`}
                                                            alt="공유"
                                                            className={styles.menuIcon}
                                                        />
                                                        공유
                                                    </li>
                                                    <hr className={styles.menuDivider}/>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/wrong.svg`}
                                                            alt="관심 없음"
                                                            className={styles.menuIcon}
                                                        />
                                                        관심 없음
                                                    </li>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/no.svg`}
                                                            alt="채널 추천 안함"
                                                            className={styles.menuIcon}
                                                        />
                                                        채널 추천 안함
                                                    </li>
                                                    <li>
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/assets/videoMore/flag.svg`}
                                                            alt="신고"
                                                            className={styles.menuIcon}
                                                        />
                                                        신고
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p
                                    className={styles.videoAuthor}
                                    onClick={(event) => handleShowVideo(video.videoId, event)}
                                >
                                    {video.author}
                                </p>
                                <p
                                    className={styles.videoStats}
                                    onClick={(event) => handleShowVideo(video.videoId, event)}
                                >
                                    {video.stats}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <div className={styles.loading}>로딩 중...</div>}
            <div ref={observerRef} style={{ height: "1px", background: "transparent"  }}></div>
        </>
    );
};

export default MainVideos;
