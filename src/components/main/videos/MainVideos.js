import React from "react";
import styles from "./MainVideos.module.css";

const MainVideos = () => {
    const videos = [
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "1:01:03",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "Playlist 주인장이 매일 아침마다 듣는 노래모음",
            author: "기분 재생목록",
            stats: "48M views · 4 months",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },
        {
            thumbnail: `${process.env.PUBLIC_URL}/thumbnail-10.png`,
            time: "2:30:45",
            profile: `${process.env.PUBLIC_URL}/avatar-1.png`,
            title: "평온한 오후에 듣기 좋은 노래들",
            author: "음악의 시간",
            stats: "32M views · 1 year",
        },

    ];

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
