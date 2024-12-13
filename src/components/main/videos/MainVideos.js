import React, { useEffect, useState } from "react";
import styles from "./MainVideos.module.css";
import { getMainVideos } from "../../../service/MainService";

const MainVideos = ({ fetchFunction }) => {
    const [videos, setVideos] = useState([]); // 비디오 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true); // 로딩 시작
                const videoData = await getMainVideos(fetchFunction);
                setVideos(videoData); // 상태에 데이터 저장
            } catch (e) {
                setError("동영상을 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchVideos();
    }, [fetchFunction]); // fetchFunction 변경 시 useEffect 재실행

    if (loading) {
        return <div className={styles.loading}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.videoGrid}>
            {videos.map((video, index) => (
                <div key={index} className={styles.videoPreview}>
                    <div className={styles.thumbnailRow}>
                        <img
                            className={styles.thumbnail}
                            alt={video.title}
                            src={video.thumbnail}
                        />
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
                                <p className={styles.videoTitle}>{video.title}</p>
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
