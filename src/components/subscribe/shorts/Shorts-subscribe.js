import React, { useState, useEffect } from 'react';
import styles from './Shorts-subscribe.module.css';
import { fetchShortsVideos } from "../../../service/SubscribeService";
import useNavigation from "../../../hooks/useNavigation";

const ShortsSubscribe = () => {
    const [shorts, setShorts] = useState([]);
    const [hoveredVideo, setHoveredVideo] = useState(null); // 현재 호버 중인 비디오 ID
    const { link } = useNavigation();

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


        const handleShowVideo = (videoId, event) => {
            if (event) event.stopPropagation(); // 이벤트 버블링 방지
            link(`/detail?q=${videoId}`);
        };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>Shorts</h3>
            </header>
            <main className={styles.main}>
                {shorts.map((shorts, index) => (
                    <div key={index} className={styles.shortsContainer}>
                        <div className={styles.shorts} onClick={(event) => handleShowVideo(shorts.id, event)}>
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
                            <p>조회수 {shorts.viewerCount}</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ShortsSubscribe;

