import "./MyPage.css";
import instance from "../../api/api";
import requests from "../../api/endpoint";
import React, {useState, useEffect} from "react";

const videoData = [{
    thumbnail: "https://i.ytimg.com/vi/Gg_J9Eonl4Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAag4fMJqf99yAtvLDQNbu2ZJ94Lw",
    title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
    channel: "김로라",
    view: "7.3만회",
    uploadedAt: "4주 전",
    duration: "3:13:00",
},
    {
        title: "11월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트 | Playlist | Kpop",
        thumbnail: "https://i.ytimg.com/vi/xFwNdsuoseQ/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBIiv2i0UwmAX5ch9qIAWpQ0m-4yA",
        channel: "밤공원",
        view: "6.7만회",
        uploadedAt: "4일 전",
        duration: "2:01:50",
    },
    {
        thumbnail: "https://i.ytimg.com/vi/Gg_J9Eonl4Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAag4fMJqf99yAtvLDQNbu2ZJ94Lw",
        title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
        channel: "김로라",
        view: "7.3만회",
        uploadedAt: "4주 전",
        duration: "3:13:00",
    },
    {
        title: "11월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트 | Playlist | Kpop",
        thumbnail: "https://i.ytimg.com/vi/xFwNdsuoseQ/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBIiv2i0UwmAX5ch9qIAWpQ0m-4yA",
        channel: "밤공원",
        view: "6.7만회",
        uploadedAt: "4일 전",
        duration: "2:01:50",
    },
    {
        thumbnail: "https://i.ytimg.com/vi/Gg_J9Eonl4Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAag4fMJqf99yAtvLDQNbu2ZJ94Lw",
        title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
        channel: "김로라",
        view: "7.3만회",
        uploadedAt: "4주 전",
        duration: "3:13:00",
    },
    {
        title: "11월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트 | Playlist | Kpop",
        thumbnail: "https://i.ytimg.com/vi/xFwNdsuoseQ/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBIiv2i0UwmAX5ch9qIAWpQ0m-4yA",
        channel: "밤공원",
        view: "6.7만회",
        uploadedAt: "4일 전",
        duration: "2:01:50",
    },
]

// const fetchPlaylistsVideos = async () => {
//     try {
//         const res = await instance.get('playlistItems', {
//             params: {
//                 part: 'snippet',
//                 playlistId: 'PLEJrijY-Z4cBcAoOfujrtSauwxc9XE89A',
//                 maxResults: 48,
//             },
//         });
//         console.log(res.data.items);
//         setVideoList(res.data.items);
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const fetchPlaylistsVideos = async () => {
//     const token = process.env.REACT_APP_TOKEN_URL;
//     console.log("Token used for request:", token);
//     try{
//         const {data: {items : response}} = await instance.get(requests.fetchPlaylistsVideos, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: {
//                 part: "snippet",
//                 mine:true,
//                 regionCode: "KR",
//                 maxResults: 48,
//             }
//         });
//         console.log("fetchPlaylistsVideos response",response);
//         return response;
//     } catch (e) {
//         console.log("fetchPlaylistsVideos can't get response data", e);
//     }
// }

export default function MyPage() {
//     const tag = '[MyPage]';
//     const [videoList, setVideoList] = useState([]);
//     const token = "process.env.REACT_APP_TOKEN_URL";
//
//     useEffect(() => {
//         const loadVideos = async () => {
//             const response = await fetchPlaylistsVideos(token);
//             setVideoList(response);
//         };
//
//         loadVideos();
//     }, [token]);

    return (
        <div className="container">
            <div className="relative-layout-container">
                <div className="absolute-layout-container">
                    <div className="contents-container">
                        <div className="user-page-info-container">
                            <img className="user-profile-img"
                                 src="/assets/mypage/user-profile.png"
                                 alt="user-profile-img"/>
                            <div className="user-name-and-id-container">
                                <section className="user-name-container">
                                    <p className="user-name">공공</p>
                                    <a href="https://www.naver.com/"
                                       className="user-channel-move">
                                        @o0_o0_o0 &#183; 채널 보기</a>
                                </section>
                                <div className="changes-container">
                                    <section className="changes-id-container">
                                        <img className="chang-id-icon"
                                             src="/assets/mypage/profile-icon.svg"
                                             alt="user-pforile-icon"/>
                                        <p className="changes-id-text">계정 전환</p>
                                    </section>
                                    <div className="Google-id-change-container">
                                        <section className="Google-id-container">
                                            <img className="chang-id-icon"
                                                 src="/assets/mypage/google-logo-icon.svg"
                                                 alt="google-id"/>
                                            <p className="changes-id-text">Google 계정</p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="view-record-container">
                            <section className="view-record-text-btn">
                                <p>기록</p>
                                <button className="all-video-view">모두 보기</button>
                            </section>
                            <section className="view-record-contents-container">
                                <section className="video-list">
                                    {videoData.map((video, i) => (
                                        <section className="video-item"
                                                 key={`${i}-${video.videoId}`}>
                                            <div className="video-thumbnail-container">
                                                <img className="video-thumbnail"
                                                     src={video.thumbnail}
                                                     alt={video.title}/>
                                                <div className="progress-bar-container">
                                                    <div className="progress-bar"></div>
                                                </div>
                                            </div>
                                            <div className="video-info-container">
                                                <h3 className="video-title">{video.title}</h3>
                                                <p className="video-channel">{video.channelTitle}</p>
                                                <p className="video-meta">
                                                    {/*{video.publishedAt}*/}
                                                    {video.view} · {video.uploadedAt}
                                                </p>
                                            </div>
                                        </section>
                                    ))}
                                    <button className="next-video-btn"> ></button>
                                </section>
                            </section>
                        </div>
                        <div className="playlist-container playlist-container-margin">
                            <section className="playlist-text-btn">
                                <section className="playlist-sort-text">
                                    <p className="playlist-text">재생목록</p>
                                    <button className="sort-text">가나다순 &#9660;</button>
                                </section>
                                <section className="playlist-all-and-plus-btn">
                                    <button className="plus-btn">+</button>
                                    <button className="playlist-all-view">모두 보기</button>
                                </section>
                            </section>
                            <section className="playlist-contents-container">
                                <section className="playlist-list">
                                    {videoData.map((video, i) => (
                                        <section className="playlist-video-item"
                                                 key={`${i}-${video.videoId}`}>
                                            <div className="playlist-video-thumbnail-container">
                                                <img className="playlist-video-thumbnail"
                                                     src={video.thumbnail}
                                                     alt={video.title}/>
                                            </div>
                                            <div className="playlist-video-info-container">
                                                <h3 className="playlist-video-title">{video.title}</h3>
                                                <p className="playlist-video-channel">{video.channel} &#183; 재생목록</p>
                                                <p className="playlist-video-meta">
                                                    모든 재생목록 보기
                                                </p>
                                            </div>
                                        </section>
                                    ))}
                                    <button className="playlist-next-video-btn"> ></button>
                                </section>
                            </section>
                        </div>
                        <div className="Videos-to-watch-container Videos-to-watch-container-height">
                            <section className="Videos-to-watch-text-btn">
                                <section className="Videos-to-watch-later">
                                    <p>나중에 볼 동영상</p>
                                    <p className="watch-later-num">6</p>
                                </section>
                                <button className="all-video-view">모두 보기</button>
                            </section>
                            <section className="view-record-contents-container">
                                <section className="video-list">
                                    {videoData.map((video, i) => (
                                        <section className="video-item"
                                                 key={`${i}-${video.videoId}`}>
                                            <div className="video-thumbnail-container">
                                                <img className="video-thumbnail"
                                                     src={video.thumbnail}
                                                     alt={video.title}/>
                                            </div>
                                            <div className="video-info-container">
                                                <h3 className="video-title">{video.title}</h3>
                                                <p className="video-channel">{video.channel}</p>
                                                <p className="video-meta">
                                                    {video.view} · {video.uploadedAt}
                                                </p>
                                            </div>
                                        </section>
                                    ))}
                                    <button className="next-video-btn"> ></button>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}