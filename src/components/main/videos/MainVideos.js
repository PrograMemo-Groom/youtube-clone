import React, { useEffect, useState } from "react";
import styles from "./MainVideos.module.css";
import {getMainVideos} from "../../../service/VideoService";

const MainVideos = () => {
    const [videos, setVideos] = useState([]); // 비디오 데이터 상태

    useEffect(() => {
        const fetchVideos = async () => {
            const videoData = await getMainVideos();
            const formattedVideos = videoData.map((video) => ({
                thumbnail: video.snippet.thumbnails.high.url,
                time: "N/A",
                profile: "",
                title: video.snippet.title,
                author: video.snippet.channelTitle,
                stats: `조회수 ${video.statistics.viewCount}회 · ${new Date(video.snippet.publishedAt).toLocaleDateString()}`, // 조회수 및 업로드 날짜
            }));
            setVideos(formattedVideos);
        };

        fetchVideos();
    }, []);

    return (
        <div className={styles.videoGrid}>
            {videos.map((video, index) => (
                <div key={index} className={styles.videoPreview}>
                    <div className={styles.thumbnailRow}>
                        <img
                            className={styles.thumbnail}
                            alt="thumbnail"
                            src={video.thumbnail}
                        />
                        <div className={styles.videoTime}>{video.time}</div>
                    </div>
                    <div className={styles.videoInfoGrid}>
                        <div className={styles.channelPicture}>
                            <img
                                className={styles.profilePicture}
                                alt="avatar"
                                src={video.profile}
                            />
                        </div>
                        <div className={styles.videoInfo}>
                            <p className={styles.videoTitle}>{video.title}</p>
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
