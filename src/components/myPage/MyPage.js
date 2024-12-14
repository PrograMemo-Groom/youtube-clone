import "./MyPage.css";
import React, {useState} from "react";
import axios from "axios";

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

const handleLogin = () => {
    // const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/youtube.readonly&access_type=offline&prompt=consent`;
    const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=email%20profile%20https://www.googleapis.com/auth/youtube.readonly&access_type=offline&prompt=consent`;
    // const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=email%20profile%20https://www.googleapis.com/auth/youtube.readonly&access_type=offline&prompt=consent`;
    // const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=email profile`;
    console.log("Generated OAuth URL:", authUrl);
    window.location.href = authUrl; // Google OAuth 로그인 리디렉션
};

const authTokenAPI = async (authCode) => {
    console.log("여기까지 왔나? 1:", "authTokenAPI");
    try {
        const params = new URLSearchParams();
        params.append("code", authCode);
        params.append("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID);
        params.append("client_secret", process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
        params.append("redirect_uri", process.env.REACT_APP_REDIRECT_URI);
        params.append("grant_type", "authorization_code");

        console.log("Request Params:", params.toString());

        const response = await axios.post("https://oauth2.googleapis.com/token", params, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        });

        console.log("Access Token:", response.data.access_token);
        console.log("Refresh Token:", response.data.refresh_token);
        return response.data; // 필요한 토큰 반환
    } catch (error) {
        console.error("Error exchanging authorization code for tokens:", error.response?.data || error.message);

        if (error.response && error.response.data) {
            console.error("Error details:", error.response.data);
        }
    }
};


const extractAuthCode = async () => {
    console.log("여기까지 왔나? 2:", "extractAuthCode");
    console.log("Current URL:", window.location.href); // 현재 URL 출력
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    if (!code) {
        // URL에 code가 없으면 로컬 스토리지에서 가져오기
        code = localStorage.getItem("GOOGLE_TOKEN");
        if (code) {
            console.log("Authorization Code from localStorage:", code); // 인증 코드 출력
        } else {
            console.error("Authorization Code not found in the URL or localStorage");
            return;
        }
    } else {
        // URL에 code가 있으면 로컬 스토리지에 저장
        console.log("Authorization Code from URL:", code);
        localStorage.setItem("GOOGLE_TOKEN", code);
    }
    // if (code) {
    //     console.log("Authorization Code:", code); // 인증 코드 출력
    //     authTokenAPI(code); // 인증 코드를 사용해 액세스 토큰 요청
    // } else {
    //     console.error("Authorization Code not found in the URL");
    // }
    // 토큰 요청
    const tokenData = await authTokenAPI(code);
    if (tokenData) {
        console.log("Tokens:", tokenData);
        // 토큰 데이터를 로컬 스토리지에 저장
        localStorage.setItem("ACCESS_TOKEN", tokenData.access_token);
        localStorage.setItem("REFRESH_TOKEN", tokenData.refresh_token);
    }
};

const fetchYouTubePlaylists = async () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN"); // 저장된 액세스 토큰 불러오기
    if (!accessToken) {
        console.error("Access token not found. Please log in again.");
        return;
    }

    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
            headers: {
                Authorization: `Bearer ${accessToken}`, // 액세스 토큰 추가
            },
            params: {
                part: "snippet,contentDetails", // 필요한 데이터
                mine: true, // 사용자의 재생목록
            },
        });

        console.log("YouTube Playlists:", response.data.items);
        return response.data.items; // 재생목록 데이터 반환
    } catch (error) {
        console.error("Error fetching YouTube playlists:", error.response?.data || error.message);
    }
};

const fetchUserChannel = async (accessToken) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet, contentDetails",
                mine: true,
                maxResults: 10,
            },
        });

        // 채널 정보 추출
        const channel = response.data.items[0];

        console.log("Playlists Data:", response.data.items);
        return response.data.items; // 재생목록 반환

        // console.log("Channel Data:", channel);
        // return channel.snippet.title; // 채널 이름 반환
    } catch (error) {
        console.error("Error fetching user channel:", error.response?.data || error.message);
    }
};

const fetchUserPlaylists = async (accessToken) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet,contentDetails",
                mine: true,
                maxResults: 25, // 가져올 재생목록의 최대 개수
            },
        });

        // 재생목록 데이터 추출
        console.log("Playlists Data:", response.data.items);
        return response.data.items; // 재생목록 반환
    } catch (error) {
        console.error("Error fetching user playlists:", error.response?.data || error.message);
    }
};

const fetchWatchLaterVideos = async (accessToken) => {
    console.log("여긴 왔니? 4:", "fetchWatchLaterVideos");
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet,contentDetails",
                maxResults: 25,
                playlistId: "WL", // "나중에 볼 동영상"
            },
        });

        console.log("Watch Later Videos:", response.data.items);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching Watch Later videos:", error.response?.data || error.message);
    }
};

export default function MyPage() {
    console.log("여기까지 왔나? 3:", "MyPage()");

    const [playlists, setPlaylists] = React.useState([]);
    const [channelName, setChannelName] = useState("");
    const [isToggleVisible, setToggleVisible] = React.useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("가나다순");
    const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);

    const handleToggle = () => {
        setToggleVisible((prev) => !prev);
    };

    // 드롭다운 토글 핸들러
    const handleToggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    // 정렬 옵션 선택 핸들러
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false); // 선택 후 드롭다운 닫기
        // 정렬 로직 추가
        if (option === "가나다순") {
            const sortedPlaylists = [...playlists].sort((a, b) =>
                a.snippet.title.localeCompare(b.snippet.title)
            );
            setPlaylists(sortedPlaylists);
        } else if (option === "최신순") {
            const sortedPlaylists = [...playlists].sort((a, b) =>
                new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
            );
            setPlaylists(sortedPlaylists);
        }
        console.log(`Selected sorting option: ${option}`);
    };
    // 인증 코드 추출 및 토큰 발급
    // React.useEffect(() => {
    //     extractAuthCode(); // 인증 코드 추출 및 토큰 발급
    // }, []);

    // 인증 코드 추출 및 토큰 발급
    React.useEffect(() => {
        const extractAuthCode = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");

            if (!code) {
                console.error("Authorization Code not found in the URL.");
                return;
            }

            // 토큰 발급 요청
            const tokenData = await authTokenAPI(code);
            if (tokenData) {
                localStorage.setItem("ACCESS_TOKEN", tokenData.access_token);
                localStorage.setItem("REFRESH_TOKEN", tokenData.refresh_token);
                console.log("Tokens stored successfully.");
            }
        };

        extractAuthCode(); // 인증 코드 추출 및 토큰 요청
    }, []);

    // 유튜브 API 데이터 가져오기
    React.useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");

            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                return;
            }

            // 채널 이름 가져오기
            const channel = await fetchUserChannel(accessToken);
            if (channel) {
                setChannelName(channel);
            }

            // 재생목록 가져오기
            const playlists = await fetchUserPlaylists(accessToken);
            if (playlists) {
                setPlaylists(playlists);
            }

            // "나중에 볼 동영상" 데이터 가져오기
            const videos = await fetchWatchLaterVideos(accessToken);
            if (videos) {
                setWatchLaterVideos(videos); // 상태에 저장
            }
        };

        fetchData(); // 데이터 요청
    }, []);

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
                                        <button className="changes-id-text"
                                                onClick={handleLogin}>계정 전환
                                        </button>
                                    </section>
                                    <div className="Google-id-change-container">
                                        <section className="Google-id-container">
                                            <img className="chang-id-icon"
                                                 src="/assets/mypage/google-logo-icon.svg"
                                                 alt="google-id"/>
                                            <button className="changes-id-text"
                                                    onClick={() => window.location.href = "https://myaccount.google.com/"}>Google
                                                계정
                                            </button>
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
                                                <div className="progress-container">
                                                    <section className="view-icons-container">
                                                        <div className="icon-wrapper">
                                                            <img
                                                                className="video-view-later-icon"
                                                                src="/assets/mypage/video-later-view-icon.svg"
                                                                alt="video-later-view-icon"
                                                            />
                                                            <p className="video-later-view-text">나중에 볼 동영상</p>
                                                        </div>
                                                        {/*<div className="icon-wrapper">*/}
                                                        {/*    <img*/}
                                                        {/*        className="add-playlist-icon"*/}
                                                        {/*        src="/assets/mypage/playlist-icon.svg"*/}
                                                        {/*        alt="add-playlist-icon"*/}
                                                        {/*    />*/}
                                                        {/*    <p className="add-playlist-text">현재 재생목록에 추가</p>*/}
                                                        {/*</div>*/}
                                                    </section>
                                                    <section className="progress-time-container">
                                                        <p className="progress-time">2:29:28</p>
                                                    </section>
                                                    <section className="progress-bar-container">
                                                        <div className="progress-bar"></div>
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="video-info-container">
                                                <div className="video-title-and-toggle-container">
                                                    <h3 className="video-title">{video.title}</h3>
                                                    <button className="toggle_btn" onClick={handleToggle}>
                                                        <img className="ellipsis-toggle-btn"
                                                             src="/ellipsis.png"
                                                             alt="ellipsis-toggle-btn"
                                                        />
                                                    </button>
                                                    {/* 토글 카테고리 */}
                                                    <div className={`div-toggle ${isToggleVisible ? "visible" : ""}`}>
                                                        <p>현재 재생목록에 추가</p>
                                                        <p>나중에 볼 동영상에 저장</p>
                                                        <p>재생목록에 저장</p>
                                                        <p>오프라인 저장</p>
                                                        <p>공유</p>
                                                        <p>시청 기록에서 삭제</p>
                                                    </div>
                                                </div>
                                                <div className="video-channel-and-meta-container">
                                                    <p className="video-channel">{video.channelTitle}</p>
                                                    <p className="video-meta">
                                                        {/*{video.publishedAt}*/}
                                                        {video.view} · {video.uploadedAt}
                                                    </p>
                                                </div>
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
                                    <div className="sort-dropdown-container">
                                        <button
                                            className="sort-button"
                                            onClick={handleToggleDropdown}
                                        >
                                            {selectedOption} &#9660;
                                        </button>
                                        {isDropdownVisible && (
                                            <div className="dropdown-menu">
                                                <p
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        handleSelectOption("가나다순")
                                                    }
                                                >
                                                    가나다순
                                                </p>
                                                <p
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        handleSelectOption("최신순")
                                                    }
                                                >
                                                    최신순
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {/*<button className="sort-text">가나다순 &#9660;</button>*/}
                                </section>
                                <section className="playlist-all-and-plus-btn">
                                    <button className="plus-btn">+</button>
                                    <button className="playlist-all-view">모두 보기</button>
                                </section>
                            </section>
                            <section className="playlist-contents-container">
                                <section className="playlist-list">
                                    {playlists.map((playlist, i) => (
                                        <section className="playlist-video-item"
                                                 key={`${i}-${playlist.id}`}>
                                            <div className="playlist-video-thumbnail-container">
                                                <img className="playlist-video-thumbnail"
                                                     src={playlist.snippet.thumbnails.medium.url}
                                                     alt={playlist.snippet.title}/>
                                            </div>
                                            <div className="playlist-video-info-container">
                                                <h3 className="playlist-video-title">{playlist.snippet.title}</h3>
                                                <p className="playlist-video-channel">{playlist.snippet.channelTitle} &#183; 재생목록</p>
                                                <p className="playlist-video-meta">
                                                    {/*모든 재생목록 보기*/}
                                                    {playlist.contentDetails.itemCount} 개의 동영상
                                                </p>
                                            </div>
                                        </section>
                                    ))}
                                    <button className="playlist-next-video-btn"> &gt; </button>
                                </section>
                            </section>
                        </div>
                        <div className="Videos-to-watch-container Videos-to-watch-container-height">
                            <section className="Videos-to-watch-text-btn">
                                <section className="Videos-to-watch-later">
                                    <p>나중에 볼 동영상</p>
                                    <p className="watch-later-num">{watchLaterVideos.length}</p>
                                </section>
                                <button className="all-video-view">모두 보기</button>
                            </section>
                            <section className="view-record-contents-container">
                                <section className="video-list">
                                    {watchLaterVideos.map((video, i) => (
                                        <section className="video-item"
                                                 key={`${i}-${video.contentDetails.videoId}`}>
                                            <div className="video-thumbnail-container">
                                                <img className="video-thumbnail"
                                                     src={video.snippet.thumbnails.medium.url}
                                                     alt={video.snippet.title}/>
                                            </div>
                                            <div className="video-info-container">
                                                <h3 className="video-title">{video.snippet.title}</h3>
                                                <p className="video-channel">{video.snippet.channelTitle}</p>
                                                <p className="video-meta">
                                                    {/* 업로드 날짜 */}
                                                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                                    {/*{video.view} · {video.uploadedAt}*/}
                                                </p>
                                            </div>
                                        </section>
                                    ))}
                                    <button className="next-video-btn"> &gt; </button>
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}