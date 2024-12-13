import React, { useEffect, useState} from "react";
import styles from "./MainVideos.module.css";
import { getMainVideos } from "../../../service/MainService";
import useNavigation from "../../../hooks/useNavigation";

const MainVideos = ({ fetchFunction }) => {
    const [videos, setVideos] = useState([]);// 비디오 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); //로딩 상태
    const [error, setError] = useState(null); //에러 상태
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID
    const [openDropdown, setOpenDropdown] = useState(null); //더보기 메뉴
    const { link } = useNavigation();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const videoData = await getMainVideos(fetchFunction);
                setVideos(videoData);
            } catch (e) {
                setError("동영상을 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [fetchFunction]);

    const handleShowVideo = (videoId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        link(`/detail?q=${videoId}`);
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
                            />
                        </div>
                        <div
                            className={styles.videoInfo}
                        >
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
    );
};


export default MainVideos;
