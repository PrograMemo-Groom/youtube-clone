import React, { useState } from 'react';
import styles from './Grid-subscribe.module.css';
import ListedSubscribe from './Listed-subscribe';
import ManageSubscribe from './Manage-subscribe';


const GridSubscribe = () => {

    const [view, setView] = useState("grid");

    return (
        <div className={styles.container}>

            {/* manage로 뷰 바뀌는 부분(헤더까지 바뀜) */}
            {view === "manage" && <ManageSubscribe />}
            {view === "list" && <ListedSubscribe />}
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
                            <img alt='격자형'/>
                        </button>
                        <button
                            className={styles.listButton}
                            onClick={() => setView("list")}
                        >
                            <img alt='리스트형'/>
                        </button>
                    </div>
                </header>

                <main className={styles.main}>
                    <section className={styles.videoSection}>
                        {videoData.map((video, index) => (
                            <article key={index} className={styles.videoClip}>
                                <div className={styles.videoThumbnail}>
                                    <img 
                                        src={video.thumbnail} 
                                        alt={video.title} 
                                        className={styles.thumbnail} 
                                    />
                                    <p>{video.duration}</p>
                                </div>
                                <div className={styles.videoDescriptions}>
                                    <img 
                                        src={video.channelAvatar}
                                        alt='채널프로필사진'
                                    />
                                    <div className={styles.videoDescriptions_lines}>
                                        <h4>{video.title}</h4>
                                        <p>{video.channel}</p>
                                        <p>{video.view} • {video.uploadedAt}</p>
                                    </div>
                                    <div className={styles.videoDescriptions_button}>
                                        <button>
                                            <img src='/assets/subscribe/video-option-btn.svg' alt='영상옵션버튼'/>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                    <section className={styles.shortsSection}>

                    </section>
                    <section className={styles.videoSection}>

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