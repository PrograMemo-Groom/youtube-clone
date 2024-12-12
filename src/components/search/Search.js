import React, {useEffect, useState} from 'react';
import styles from "./Search.module.css";
import {useLocation} from "react-router-dom";
import {fetchSearchVideos} from "../../service/VideoService";

// const videoData = {
//     "pageToken": "CAMQAA",
//     "items": [
//         {
//             "videoId": "mk5DtMGYLGU",
//             "channelId": "UCF4Wxdo3inmxP-Y59wXDsFw",
//             "channelTitle": "MBCNEWS",
//             "description": "12·3 내란 사태와 탄핵 정국은 온라인 이슈를 한순간에 뒤덮었습니다. 구글 트렌드 검색 데이터에 따르면, 지난 2일부터 9일까지 국내 ...",
//             "publishTime": "2024-12-10T22:13:40Z",
//             "defaultThumbnail": {
//                 "url": "https://i.ytimg.com/vi/mk5DtMGYLGU/default.jpg",
//                 "width": 120,
//                 "height": 90
//             },
//             "highThumbnail": {
//                 "url": "https://i.ytimg.com/vi/mk5DtMGYLGU/hqdefault.jpg",
//                 "width": 480,
//                 "height": 360
//             },
//             "mediumThumbnail": {
//                 "url": "https://i.ytimg.com/vi/mk5DtMGYLGU/mqdefault.jpg",
//                 "width": 320,
//                 "height": 180
//             },
//             "title": "[와글와글] 구글서 &#39;계엄령&#39;·&#39;윤석열&#39; 검색량 폭증 (2024.12.11/뉴스투데이/MBC)"
//         },
//         {
//             "videoId": "aMtvJoE_EJQ",
//             "channelId": "UCIUni4ScRp4mqPXsxy62L5w",
//             "channelTitle": "언더스탠딩 : 세상의 모든 지식",
//             "description": "언더스탠딩 문의: to.understanding.official@gmail.com 글로 읽는 \"언더스탠딩 텍스트\".",
//             "publishTime": "2024-09-05T09:15:00Z",
//             "defaultThumbnail": {
//                 "url": "https://i.ytimg.com/vi/aMtvJoE_EJQ/default.jpg",
//                 "width": 120,
//                 "height": 90
//             },
//             "highThumbnail": {
//                 "url": "https://i.ytimg.com/vi/aMtvJoE_EJQ/hqdefault.jpg",
//                 "width": 480,
//                 "height": 360
//             },
//             "mediumThumbnail": {
//                 "url": "https://i.ytimg.com/vi/aMtvJoE_EJQ/mqdefault.jpg",
//                 "width": 320,
//                 "height": 180
//             },
//             "title": "(1부) 구글 검색의 시대 끝날 것 같습니다 (솔트룩스 이경일 대표)"
//         },
//         {
//             "videoId": "Pw_Mzxtyarc",
//             "channelId": "UCsU-I-vHLiaMfV_ceaYz5rQ",
//             "channelTitle": "JTBC News",
//             "description": "챗GPT를 개발한 오픈AI가 검색엔진 기능을 소개했습니다. 네이버나 구글 같은 역할을 하게 되는데, 인공지능은 머지않아 개인 비서로 ...",
//             "publishTime": "2024-10-31T23:39:02Z",
//             "defaultThumbnail": {
//                 "url": "https://i.ytimg.com/vi/Pw_Mzxtyarc/default.jpg",
//                 "width": 120,
//                 "height": 90
//             },
//             "highThumbnail": {
//                 "url": "https://i.ytimg.com/vi/Pw_Mzxtyarc/hqdefault.jpg",
//                 "width": 480,
//                 "height": 360
//             },
//             "mediumThumbnail": {
//                 "url": "https://i.ytimg.com/vi/Pw_Mzxtyarc/mqdefault.jpg",
//                 "width": 320,
//                 "height": 180
//             },
//             "title": "&#39;구글에 정면 도전한다&#39;…오픈AI &#39;챗GPT 검색&#39; 기능 출시 #소셜픽 / JTBC 아침&amp;"
//         }
//     ]
// }

const tag = '[SearchPage]';
const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [nextToken, setNextToken] = useState("");
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim().length > 0) {
                const response = await fetchSearchVideos(searchTerm);
                console.log(tag, "fetchData:", response);
                setSearchResult(response.items || []);
                setNextToken(response.pageToken || "");
            }
        }
        fetchData();
    }, [searchTerm]);
    // console.log("dummy data",searchResult);

    return (
        <div className={styles.container}>
            <div className={styles.categoryWrapper}>
                <div className={styles.categories}>
                    <button>전체</button>
                    <button>shorts</button>
                    <button>동영상</button>
                    <button>시청하지 않음</button>
                    <button>감상한 동영상</button>
                    <button>최근에 업로드된 동영상</button>
                    <button>라이브</button>
                    <button>채널</button>
                </div>
            </div>
            <div className={styles.videos}>
                {searchResult && searchResult.map((video) => {
                    // console.log(video);
                    // const thisData = new Date();
                    // console.log(today)
                    return (
                        <div className={styles.videoLists} key={video.videoId}>
                            <div className={styles.videoFrame}>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${video.videoId}`}
                                    title={video.title}
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation"
                                    // loading="lazy"
                                />
                                <span>1:10:13</span>
                            </div>
                            <div className={styles.videoDescriptions}>
                                <h2>{video.title}</h2>
                                <p>퍼스널 Personal•조회수 1.7만회</p>
                                <div className={styles.videoChannelInfo}>
                                    <div className={styles.channelInfo}>
                                        <img src={video.defaultThumbnail.url} alt="img" />
                                        <span>{video.channelTitle}</span>
                                    </div>
                                </div>
                                <p className={styles.videoDescript}>{video.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Search;
