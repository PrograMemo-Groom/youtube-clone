import React, { useState } from 'react';
import styles from './Listed-subscribe.module.css';
import GridSubscribe from '../grid/Grid-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';

const ListedSubscribe = () => {

    const [view, setView] = useState("list");

    return (
        <div className={styles.container}>

            {/* manage로 뷰 바뀌는 부분(헤더까지 바뀜 */}
            {view === "manage" && <ManageSubscribe />}
            {view === "grid" && <GridSubscribe />}
            {view === "list" && (
                <>
                    <main>
                        <section className={styles.videoSection}>
                            {video2Data.map((video, index) => (
                                <>
                                    <article key={index} className={styles.videoClip}>
                                        <header className={styles.videoClip_header}>
                                            <div className={styles.header_channel}>
                                                <img
                                                    src={video.channelAvatar}
                                                    alt='채널프로필사진' 
                                                />
                                                <h4>{video.channel}</h4>
                                            </div>
                                            {index === 0 && (
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
                                            )}
                                        </header>
                                        <div className={styles.videoClip_main}>
                                            <div className={styles.videoThumbnail}>
                                                <img
                                                    src={video.thumbnail}
                                                    alt='썸네일'
                                                />
                                                <p>{video.duration}</p>
                                            </div>
                                            <div className={styles.videoDescriptions_lines}>
                                                <div className={styles.videoTitle}>
                                                    <h5>{video.title}</h5>
                                                    <button>
                                                        <img src='/assets/subscribe/video-option-btn.svg' alt='영상옵션버튼'/>
                                                    </button>
                                                </div>
                                                <p className={styles.videoInfo}>{video.channel}  {video.view} • {video.uploadedAt}</p>
                                                <p className={styles.videoDes}>{video.description}</p>
                                            </div>
                                        </div>
                                    </article>
                                    {index === 0 && <section className={styles.shortsSection}>
                                        shorts 입니다아아
                                    </section>}
                                </>
                            ))}
                        </section>
                    </main>
                </>
            )}
        </div>        
    );
};

export default ListedSubscribe;


const video2Data = [{
    videoId: "8yEzRxsilu0",
    thumbnail: "https://i.ytimg.com/vi/6ED5RqKYOfg/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAfsoZI_y_8YGR7CJupS5HgH9mcqQ",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    subscriberCount: "167만",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
    description: "모카와 우유의 일상을 함께 봐주셔서 감사합니다 :) • 모카 생년월일: 2011.10.22 견종: 폼피츠 성별: 남 • 우유 생년월일: 2016.11.07 견종: 사모예드 성별: 여 _________________________________________________________ Thank you for watching MochaMilk's daily vlog :) • Mocha Birth: 2011.10.22",
    } , {
    videoId: "8yEzRxsilu0",
    thumbnail: "https://i.ytimg.com/vi/6ED5RqKYOfg/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAfsoZI_y_8YGR7CJupS5HgH9mcqQ",
    title: "[subsoon] 웜톤이 겨울에 하기 좋은..🤎포근한 베이지 메이크업 | 미지근 메이크업 | 겨울 메이크업 | 웜톤 메이크업 | 라떼 메이크업 | 재유JEYU",
    channel: "재유JEYU",
    subscriberCount: "167만",
    channelAvatar: "https://yt3.ggpht.com/8tchUMsRZMDjy2cBo1NFolFTM2CBb4PzMKQJv-xqGJlBo99hGHLNMnJzSOI2v3dargo7iEu-3xI=s68-c-k-c0x00ffffff-no-rj-mo",
    view: "1.5만회",
    uploadedAt: "15시간 전",
    duration: "16:08",
    description: "모카와 우유의 일상을 함께 봐주셔서 감사합니다 :) • 모카 생년월일: 2011.10.22 견종: 폼피츠 성별: 남 • 우유 생년월일: 2016.11.07 견종: 사모예드 성별: 여 _________________________________________________________ Thank you for watching MochaMilk's daily vlog :) • Mocha Birth: 2011.10.22",
    },
]

const shortsData = [{
    thumbnail: "https://i.ytimg.com/vi/ELqqGhM6Q88/oardefault.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLA0y2husIrvzHjdSCivicyMwNnIyw",
    shortsId: "dkdkkdkdk1",
    title: "🔥SNS에서 난리난 게임기 모양 핸드크림?!",
    duration: "282",
    } , {

    }]