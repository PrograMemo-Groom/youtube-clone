import React, { useState, useEffect } from 'react';
import styles from './Grid-subscribe.module.css';
import ListedSubscribe from '../list/Listed-subscribe';
import ManageSubscribe from '../manage/Manage-subscribe';
import ShortsSubscribe from '../shorts/Shorts-subscribe';
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { fetchSubscriptionsVideos } from "../../../service/SubscribeService";
import { fetchShortsVideos } from "../../../service/SubscribeService";


const GridSubscribe = () => {
    const [view, setView] = useState("grid");
    const [itemsPerRow, setItemsPerRow] = useState(4); // 기본값: 4개
    const [shortsVisibleCount, setShortsVisibleCount] = useState(6);

    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("GOOGLE_TOKEN"));
    const [subscriptions, setSubscriptions] = useState([]);
    const googleLogin = useGoogleAuth();
    const [shorts, setShorts] = useState([]);


        // 최초 인증 및 accessToken 만료시간 이후 재발급 받을 때 사용
        const handleGetCode = async () => {
            console.log(`handleLogin: 구글 로그인 다시 하는 중 ㅠㅠ`);
            await googleLogin();
        }
    
        useEffect(() => {
            accessToken && fetchData();
        }, [accessToken]);

        const fetchData = async () => {
            try {
                if(!accessToken) {
                    console.log("token없다이!!발급버튼 눌러서 발급받아라이!!");
                    return;
                }
                const response = await fetchSubscriptionsVideos(accessToken);  // 구독 비디오오오
                if (Array.isArray(response)) {
                    console.log('내가 가져온 동영상들 배열성공 !!');
                    const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
                    const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
                        return new Date(b.publishTime) - new Date(a.publishTime);
                    });
                    setSubscriptions(sortedResponse);
                } else {
                    console.error("받아온게 배열이 아님.. 이거임:", response);
                }
            } catch (error) {
                console.log('fetchData 에러 :', error);
            }
        }

        // 쇼츠 비디오 정보 업데이트
        useEffect(() => {
        const fetchAndSetShorts = async () => {
            try {
            const shortsVideoList = await fetchShortsVideos("NewJeans"); // 데이터를 비동기적으로 가져옴
            console.log("shortsVideo", shortsVideoList);

            // 가져온 데이터를 필요한 형식으로 변환
            const formattedShorts = shortsVideoList.map((short, index) => ({
            id: index + 1, // 임시 id 생성
            title: short.snippet.title, // 제목
            viewerCount: short.viewerCount || 0, // 조회수 (없으면 0으로 설정)
            thumbUrl: short.snippet.thumbnails.high.url, // 썸네일 URL
            }));

            // 상태 업데이트
            setShorts(formattedShorts);
            } catch (error) {
            console.error("Error fetching Shorts videos:", error);
            }
        };
        fetchAndSetShorts();
    }, []);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 750) {
                setShortsVisibleCount(2);
            } else if (window.innerWidth < 1010) {
                setShortsVisibleCount(3);
            } else if (window.innerWidth < 1230) {
                setShortsVisibleCount(4);
            } else if (window.innerWidth < 1440) {
                setShortsVisibleCount(5);
            } else {
                setShortsVisibleCount(6);
            }
        };

        // 초기 화면 크기 확인
        handleResize();
        // 리스너 추가
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                    <button
                        style={{width:'200px', height:'20px'}}
                        onClick={() => {handleGetCode();}}>
                            token 발급 받는다!!
                    </button>
                    <button
                        style={{width:'200px', height:'20px'}}
                        onClick={() => {fetchData()}}>
                            누르면 데이터를 가져오ㅏ
                    </button>
                    {accessToken &&
                        <button style={{width:'200px', height:'20px'}}>
                            token값 있으면 노출
                        </button>}

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
                                <img alt="격자형" src={`${process.env.PUBLIC_URL}/grid_btn.svg`}/>
                            </button>
                            <button
                                className={styles.listButton}
                                onClick={() => setView("list")}
                            >
                                <img alt="리스트형" src={`${process.env.PUBLIC_URL}/list_btn.svg`}/>
                            </button>
                        </div>
                    </header>

                    <main className={styles.main}>
                        <section className={styles.videoSection}>
                            {subscriptions.map((video, index) => (
                                <React.Fragment key={index}> {/* 기존에 여러 요소를 반환할 수 있도록 추가 */}
                                    <article className={styles.videoClip}>
                                        <div className={styles.videoThumbnail}>
                                            <img src={video.highThumbnail} alt='나는 썸네일' />
                                            <p>{video.duration}</p>
                                        </div>
                                        <div className={styles.videoDescriptions}>
                                            <img src={video.channelAvatar} alt="채널프로필사진" />
                                            <div className={styles.videoDescriptions_lines}>
                                                <h4>{video.title}</h4>
                                                <p>{video.channelTitle}</p>
                                                <p>{video.views} • {video.publishTime}</p>
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
                                                    <img alt="로고" src={`${process.env.PUBLIC_URL}/Youtube_shorts_icon.svg`} />
                                                    <h4>Shorts</h4>
                                                </div>
                                                <button
                                                onClick={() => setView("shorts")}
                                                >
                                                    모두 보기
                                                </button>
                                            </header>
                                            <div className={styles.shortsMain}>
                                                {shorts.slice(0, shortsVisibleCount).map((shorts, shortsIndex) => (
                                                    <article key={shortsIndex} className={styles.shortsClip}>
                                                        <img
                                                            className={styles.shortsThumbnail}
                                                            alt="shorts 썸네일"
                                                            src={shorts.thumbUrl}
                                                        />
                                                        <div className={styles.shortsDetail}>
                                                            <div>
                                                                <h5>{shorts.title}</h5>
                                                                <p>조회수 {shorts.viewerCount}회</p>
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