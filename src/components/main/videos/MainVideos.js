import React, {useCallback, useEffect, useState} from "react";
import styles from "./MainVideos.module.css";
import { getMainVideos } from "../../../service/MainService";
import { useNavigate } from "react-router-dom";
import useNavigation from "../../../hooks/useNavigation";

const MainVideos = ({ fetchFunction }) => {
    const [videos, setVideos] = useState([]);// 비디오 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); //로딩 상태
    const [error, setError] = useState(null); //에러 상태
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID

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

    const handleShowVideo = (videoId) => {
        link(`/detail?q=${videoId}`);
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
                        <div className={styles.videoInfo}>
                            <div className={styles.titleRow}>
                                <p
                                    className={styles.videoTitle}
                                    onClick={() => handleShowVideo(video.videoId)}
                                >
                                    {video.title}
                                </p>
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/icon/more_btn_black.svg`}
                                    alt="more"
                                    className={styles.more}
                                />
                            </div>
                            <p className={styles.videoAuthor}>{video.author}</p>
                            <p className={styles.videoStats}>{video.stats}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default MainVideos;
