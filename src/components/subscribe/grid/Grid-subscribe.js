import React, { useState, useEffect } from 'react';
import styles from './Grid-subscribe.module.css';
import ListedSubscribe from '../list/Listed-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';
import ShortsSubscribe from '../shorts/Shorts-subscribe';

const GridSubscribe = () => {
    const [view, setView] = useState("grid");
    const [itemsPerRow, setItemsPerRow] = useState(4); // 기본값: 4개

    useEffect(() => {
        const updateItemsPerRow = () => {
            const width = window.innerWidth;

            let calculatedItemsPerRow = 1; // 기본값: 1열
            if (width >= 1421) {
                calculatedItemsPerRow = 4;
            } else if (width >= 1101 && width <= 1420) {
                calculatedItemsPerRow = 3;
            } else if (width >= 701 && width <= 1100) {
                calculatedItemsPerRow = 2;
            }

            setItemsPerRow(calculatedItemsPerRow);
        };

        // 리사이즈 이벤트 추가
        updateItemsPerRow();
        window.addEventListener("resize", updateItemsPerRow);

        return () => window.removeEventListener("resize", updateItemsPerRow);
    }, []);


    const threshold = itemsPerRow * 2; // 2줄 기준 계산

    return (
        <div className={styles.container}>
            {view === "manage" && <ManageSubscribe />}
            {view === "list" && <ListedSubscribe />}
            {view === "shorts" && <ShortsSubscribe />}
            {view === "grid" && (
                <>
                    <header className={styles.header}>
                        <h3>최신순</h3>
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
                                <img alt="격자형" />
                            </button>
                            <button
                                className={styles.listButton}
                                onClick={() => setView("list")}
                            >
                                <img alt="리스트형" />
                            </button>
                        </div>
                    </header>

                    <main className={styles.main}>
                        <section className={styles.videoSection}>
                            {videoData.map((video, index) => (
                                <React.Fragment key={index}> {/* 기존에 여러 요소를 반환할 수 있도록 추가 */}
                                    <article className={styles.videoClip}>
                                        <div className={styles.videoThumbnail}>
                                            <img src={video.thumbnail} alt={video.title} />
                                            <p>{video.duration}</p>
                                        </div>
                                        <div className={styles.videoDescriptions}>
                                            <img src={video.channelAvatar} alt="채널프로필사진" />
                                            <div className={styles.videoDescriptions_lines}>
                                                <h4>{video.title}</h4>
                                                <p>{video.channel}</p>
                                                <p>{video.view} • {video.uploadedAt}</p>
                                            </div>
                                            <div className={styles.videoDescriptions_button}>
                                                <button>
                                                    <img src="/assets/subscribe/video-option-btn.svg" alt="영상옵션버튼" />
                                                </button>
                                            </div>
                                        </div>
                                    </article>

                                    {index === threshold - 1 && ( /* 2줄 기준 threshold에서 Shorts 섹션 렌더링 */
                                        <section className={styles.shortsSection}>
                                            <header className={styles.shortsHeader}>
                                                <div className={styles.shortsLogo}>
                                                    <img alt="로고" />
                                                    <h4>Shorts</h4>
                                                </div>
                                                <button
                                                onClick={() => setView("shorts")}
                                                >
                                                    모두 보기
                                                </button>
                                            </header>
                                            <div className={styles.shortsMain}>
                                                {shortsData.map((shorts, shortsIndex) => (
                                                    <article key={shortsIndex} className={styles.shortsClip}>
                                                        <img
                                                            className={styles.shortsThumbnail}
                                                            alt="shorts 썸네일"
                                                            src={shorts.thumbnail}
                                                        />
                                                        <div className={styles.shortsDetail}>
                                                            <div>
                                                                <h5>{shorts.title}</h5>
                                                                <p>조회수 {shorts.view}회</p>
                                                            </div>
                                                            <button>
                                                                <img src="/assets/subscribe/video-option-btn.svg" alt="영상옵션버튼" />
                                                            </button>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                {/* react fragment 종료 */}
                                </React.Fragment> 
                            ))}
                        </section>
                    </main>

                </>
            )}
        </div>
    );
};

export default GridSubscribe;



const videoData = [{
    videoId: "8yEzRxsilu0",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
}, {
    videoId: "8yEzRxsilu1",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu2",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
}, {
    videoId: "8yEzRxsilu3",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu4",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu4",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu4",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu4",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu4",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
{
    videoId: "8yEzRxsilu4",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
},
]


const shortsData = [{
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    } , {
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    view: "282",
    }]