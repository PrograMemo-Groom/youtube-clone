import React, {useEffect, useState} from 'react';
import styles from './Main.module.css';
import {fetchPopularVideos} from "../../service/VideoService";

// const tag = '[Main]';
const Main = () => {
    const [video, setVideo] = useState(null);
    // 화면 최초 렌더링 시 video를 가져옴
    useEffect(() => {
        // 인기있는 video를 가져오는 부분
        setVideo(fetchPopularVideos());
    }, []);

    return (
        <div className={styles.container}>
            1
        </div>
    );
};

export default Main;
