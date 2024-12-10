import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import {fetchPopularVideos} from "../../service/VideoService";

// const tag = '[Main]';
const Main = () => {
    const [video, setVideo] = useState(null);

    const categories = [
        '전체', '음악', '라이브', '믹스', '뉴스', '게임',
        '스케치 코미디', '관광', '랩', '요리',
        '최근에 업로드된 동영상', '감상한 동영상', '새로운 맞춤 동영상'
    ];

    // 화면 최초 렌더링 시 video를 가져옴
    useEffect(() => {
        // 인기있는 video를 가져오는 부분
        setVideo(fetchPopularVideos());
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.categoryBar}>
                {categories.map((category, index) => (
                    <button key={index} className={styles.categoryButton}>
                        {category}
                    </button>
                ))}
        </div>
        </div>
    );
};

export default Main;
