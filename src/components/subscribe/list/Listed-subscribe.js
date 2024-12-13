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
                        {/* <section className={styles.videoSection}>
                            <article className={styles.videoClip}>
                                <header className={styles.videoClip_header}>
                                    <div className={styles.header_channel}>
                                        <img alt='채널 프로필 사진'/>
                                        <h4>채널 이름</h4>
                                    </div>
                                    첫번째꺼는 여기에 페이지 이동 버튼도 넣어야함
                                </header>
                                <div className={styles.videoClip_main}>
                                    <div className={styles.videoThumbnail}>
                                        <img alt='비디오 썸네일'/>
                                        <p>32:11</p>
                                    </div>
                                    <div className={styles.videoDescriptions_lines}>
                                        <h5>동영상 제목</h5>
                                        <p>채널명, 조회수, 5분전</p>
                                        <p>동영상 설명</p>
                                    </div>
                                    <div className={styles.videoDescriptions_button}>
                                        <button>
                                            <img src='/assets/subscribe/video-option-btn.svg' alt='영상옵션버튼'/>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </section> */}

                        <section className={styles.shortsSection}>
                            숏츠
                        </section>

                        <section className={styles.videoSection}>
                            {video2Data.map((video, index) => (
                                <article key={index} className={styles.videoClip}>
                                    <header className={styles.video_header}>
                                        <div className={styles.header_channel}>
                                            <img
                                                src={video.channelAvatar}
                                                alt='채널프로필사진' 
                                            />
                                            <h4>{video.channel}</h4>
                                        </div>
                                        <div>
                                            나는 버튼들 ~
                                            {/* 첫번째꺼는 여기에 페이지 이동 버튼도 넣어야함 */}
                                        </div>
                                    </header>
                                    <div className={styles.videoClip_main}>
                                        <div className={styles.videoThumbnail}>
                                            <img
                                                src={video.thumbnail}
                                                alt='채널프로필사진'
                                            />
                                            <p>{video.duration}</p>
                                        </div>
                                        <div className={styles.videoDescriptions_lines}>
                                            <h5>{video.title}</h5>
                                            <p>{video.channel}  {video.view} • {video.uploadedAt}</p>
                                            <p>{video.description}</p>
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
                    </main>



                    {/* 내가 버튼들 ~ */}
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
                </>
            )}
        </div>        
    );
};

export default ListedSubscribe;


const video2Data = [{
    videoId: "8yEzRxsilu0",
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
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
    thumbnail: "https://i.ytimg.com/vi/smx-qgs5BQ8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBhF5sXiudQvocqJbkJMnrOqrTNAA",
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