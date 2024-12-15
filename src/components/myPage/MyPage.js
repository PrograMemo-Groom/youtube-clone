import "./MyPage.css";
import "./SortDropdown.css"
import React, {useState, useCallback} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import styles from "../main/videos/MainVideos.module.css";

const handleLogin = () => {
    const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=email%20profile%20https://www.googleapis.com/auth/youtube.readonly&access_type=offline&prompt=consent`;
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
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet,contentDetails",
                mine: true, // 사용자의 재생목록
            },
        });

        console.log("YouTube Playlists:", response.data.items);
        return response.data.items;
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
                maxResults: 25,
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
                playlistId: "WL", // 나중에 볼 동영상
            },
        });

        console.log("Watch Later Videos:", response.data.items);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching Watch Later videos:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data || error.message,
        });
    }
};

// 채널 id 반환
const fetchChannelId = async (accessToken) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet",
                mine: true,
            },
        });

        // 채널 ID 반환
        return response.data.items[0].id;
    } catch (error) {
        console.error("Error fetching channel ID:", error.response?.data || error.message);
    }
};

const fetchChannelProfileImage = async (accessToken) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet",
                mine: true, // 현재 로그인된 사용자
            },
        });

        // 채널 정보에서 프로필 이미지 URL 반환
        return response.data.items[0].snippet.thumbnails.default.url;
    } catch (error) {
        console.error("Error fetching channel profile image:", error.response?.data || error.message);
    }
};

const fetchLikedVideos = async (accessToken) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet,contentDetails,statistics",
                maxResults: 15, // 가져올 영상 수 (필요에 따라 조정)
                myRating: "like", // 좋아요 누른 영상
            },
        });

        console.log("Liked Videos Data:", response.data.items);
        return response.data.items; // 좋아요 영상 데이터 반환
    } catch (error) {
        console.error("Error fetching liked videos:", error.response?.data || error.message);
        return [];
    }
};

const fetchFirstVideoId = async (accessToken, playlistId) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                part: "snippet",
                playlistId,
                maxResults: 1, // 첫 번째 동영상만 가져오기
            },
        });

        console.log("API Response for Playlist Items:", response.data);

        // 첫 번째 동영상 ID 추출
        const firstVideoId =
            response.data.items && response.data.items.length > 0
                ? response.data.items[0].snippet.resourceId.videoId
                : null;

        return firstVideoId;
    } catch (error) {
        console.error(`Error fetching first video ID for playlist ${playlistId}:`, error.message);
        return null;
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
    const [profileImage, setProfileImage] = React.useState("/assets/mypage/user-profile.png");
    const [likedVideos, setLikedVideos] = useState([]);
    const [channelId, setChannelId] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null); // 현재 열려 있는 videoId를 저장
    const [FirstVideoId, setFirstVideoId] = useState("");
    const navigate = useNavigate();
    const {link} = useNavigation();

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

            try {
                // 1. 채널 데이터 가져오기
                const channelResponse = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const channelData = await channelResponse.json();
                if (channelData.items && channelData.items.length > 0) {
                    setChannelId(channelData.items[0].id); // 채널 ID 상태 업데이트
                    setChannelName(channelData.items[0].snippet.title); // 채널 이름 설정
                } else {
                    console.error("No channel data found.");
                }

                const channel = await fetchUserChannel(accessToken);
                if (channel) {
                    setChannelName(channel);
                }

                const playlists = await fetchUserPlaylists(accessToken);
                if (playlists) {
                    setPlaylists(playlists);
                }

                const videos = await fetchWatchLaterVideos(accessToken);
                if (videos) {
                    setWatchLaterVideos(videos);
                }

                const likesVideos = await fetchLikedVideos(accessToken);
                if (likesVideos) {
                    setLikedVideos(likesVideos);
                }

                const FirstVideoId = await fetchFirstVideoId(accessToken);
                if (FirstVideoId) {
                    setFirstVideoId(FirstVideoId);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            ;
        }

        fetchData(); // 데이터 요청
    }, []);

    const handleChannelView = async () => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN"); // 저장된 액세스 토큰 불러오기

        if (!accessToken) {
            console.error("Access token not found. Please log in again.");
            return;
        }

        const channelId = await fetchChannelId(accessToken); // 채널 ID 가져오기

        if (channelId) {
            const channelUrl = `https://www.youtube.com/channel/${channelId}`;
            window.location.href = channelUrl; // 채널 페이지로 이동
        } else {
            console.error("Failed to fetch channel ID.");
        }
    };

    React.useEffect(() => {
        const fetchProfileImage = async () => {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");

            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                return;
            }

            const imageUrl = await fetchChannelProfileImage(accessToken);
            if (imageUrl) {
                setProfileImage(imageUrl);
            }
        };

        fetchProfileImage();
    }, []);

    // ISO 8601 Duration 포맷을 읽기 쉽게 변환하는 함수
    const formatDuration = (isoDuration) => {
        const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = match[1] ? match[1].slice(0, -1) : "00";
        const minutes = match[2] ? match[2].slice(0, -1) : "00";
        const seconds = match[3] ? match[3].slice(0, -1) : "00";

        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    };

    const formatViewCount = (viewCount) => {
        const count = parseInt(viewCount, 10);
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}만회`;
        } else if (count >= 10000) {
            return `${(count / 10000).toFixed(1)}천회`;
        } else {
            return `${count}회`;
        }
    };

    const handleShowVideo = (videoId) => {
        console.log("6: ", videoId);
        const queryParam = `?q=${videoId}`;
        const detailPageUrl = `/detail${queryParam}`;
        link(detailPageUrl);
    };

    const handleViewAllClick = () => {
        if (!likedVideos) {
            console.log("videoId 못 찾겠다 꾀꼬리", "handleViewAllClick");
            return;
        }
        const playlistUrl = "https://www.youtube.com/playlist?list=LL";
        window.location.href = playlistUrl;
    };

    const handViewFeed = (channelId) => {
        if (!channelId) {
            console.log("channelId 못 찾겠다 꾀꼬리", "handViewPlayList");
            return;
        }
        const FeedUrl = `https://www.youtube.com/feed/playlists?channelId=${channelId}`;
        window.location.href = FeedUrl;
    }

    const toggleDropdown = (videoId) => {
        if (openDropdown === videoId) {
            setOpenDropdown(null); // 이미 열려 있으면 닫기
        } else {
            setOpenDropdown(videoId); // 새로운 videoId 열기
        }
    };

    const navigateToPlaylist = async (playlistId, accessToken) => {
        const baseUrl = 'https://www.youtube.com/watch';

        if (!playlistId) {
            console.error("First video ID is missing.");
            return;
        }
        const url = `${baseUrl}?v=${playlistId}&list=${playlistId}`;
        window.location.href = url;
    };

    return (
        <div className="container">
            <div className="relative-layout-container">
                <div className="absolute-layout-container">
                    <div className="contents-container">
                        <div className="user-page-info-container">
                            <img className="user-profile-img"
                                 src={profileImage}
                                 alt="user-profile-img"/>
                            <div className="user-name-and-id-container">
                                <section className="user-name-container">
                                    <p className="user-name">공공</p>
                                    <a className="user-channel-move"
                                       onClick={handleChannelView}>
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
                                <button className="all-video-view" onClick={handleViewAllClick}>모두 보기</button>
                            </section>
                            <section className="view-record-contents-container">
                                <section className="video-list">
                                    {likedVideos.map((video, i) => (
                                        <section className="video-item"
                                                 key={`${i}-${video.videoId}`}>
                                            <div className="video-thumbnail-container">
                                                <img className="video-thumbnail"
                                                     src={video.snippet.thumbnails.medium.url}
                                                     alt={video.snippet.title}
                                                     onClick={() => handleShowVideo(video.id)}
                                                />
                                                <div className="progress-container">
                                                    <section className="view-icons-container">
                                                        <img className="video-view-later-icon"
                                                             src="/assets/mypage/video-later-view-icon.svg"
                                                             alt="video-later-view-icon"/>
                                                    </section>
                                                    <p className="video-later-view-text">나중에 볼 동영상</p>
                                                    <section className="add-playlist-icons-container">
                                                        <img className="add-playlist-icon"
                                                             src="/assets/mypage/playlist-icon.svg"
                                                             alt="add-playlist-icon"/>
                                                    </section>
                                                    <p className="add-playlist-text">현재 재생목록에 추가</p>
                                                    <section className="progress-time-container">
                                                        <p className="progress-time">{formatDuration(video.contentDetails.duration)}</p>
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="video-info-container">
                                                <div className="video-title-and-toggle-container">
                                                    <h3 className="video-title">{video.snippet.title}</h3>
                                                    <button
                                                        className="toggle_btn"
                                                        onClick={() => toggleDropdown(video.id)}>
                                                        <img className="ellipsis-toggle-btn"
                                                             src="/ellipsis.png"
                                                             alt="ellipsis-toggle-btn"/>
                                                    </button>
                                                    <div
                                                        className={`toggle-Menu ${openDropdown === video.id ? "visible" : ""}`}>
                                                        <ul>
                                                            <li>
                                                                <img className="menu-icons"
                                                                     src="/assets/videoMore/playlist.svg"
                                                                     alt="현재 재생목록에 추가"/>
                                                                현재 재생목록에 추가
                                                            </li>
                                                            <li>
                                                                <img className="menu-icons"
                                                                     src="/assets/videoMore/clock.svg"
                                                                     alt="나중에 볼 동영상에 저장"/>
                                                                나중에 볼 동영상에 저장
                                                            </li>
                                                            <li>
                                                                <img className="menu-icons"
                                                                     src="/assets/videoMore/bookmark.svg"
                                                                     alt="재생목록에 저장"/>
                                                                재생목록에 저장
                                                            </li>
                                                            <li>
                                                                <img className="menu-icons"
                                                                     src="/assets/videoMore/download.svg"
                                                                     alt="오프라인 저장"/>
                                                                오프라인 저장
                                                            </li>
                                                            <li>
                                                                <img className="menu-icons"
                                                                     src="/assets/videoMore/share.svg"
                                                                     alt="공유"/>
                                                                공유
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="video-channel-and-meta-container">
                                                    <p className="video-channel">{video.snippet.channelTitle}</p>
                                                    <p className="video-meta">
                                                        {formatViewCount(video.statistics.viewCount)} 조회수
                                                        · {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </section>
                                    ))}
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
                                                <p className="dropdown-item"
                                                   onClick={() => handleSelectOption("가나다순")}>가나다순</p>
                                                <p className="dropdown-item"
                                                   onClick={() => handleSelectOption("최신순")}>최신순</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                                <section className="playlist-all-and-plus-btn">
                                    <button className="playlist-all-view"
                                            onClick={() => handViewFeed(channelId)}
                                    >모두 보기
                                    </button>
                                </section>
                            </section>
                            <section className="playlist-contents-container">
                                <section className="playlist-list">
                                    {playlists.map((playlist, i) => (
                                        <section className="playlist-video-item"
                                                 key={`${i}-${playlist.id}`}>

                                            <div className="playlist-video-thumbnail-container">
                                                <div className="hover-overlay">
                                                    <img
                                                        className="playlist-video-thumbnail"
                                                        src={playlist.snippet.thumbnails.medium.url}
                                                        alt={playlist.snippet.title}/>
                                                    <div className="hover-text"
                                                         onClick={() => navigateToPlaylist(playlist.id, playlist.firstVideoId)}>
                                                        ▶ 모두 재생
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="playlist-video-info-container"
                                                 key={playlist.id}
                                                 onClick={() => navigateToPlaylist(playlist.id, playlist.firstVideoId)}>
                                                <h3 className="playlist-video-title">{playlist.snippet.title}</h3>
                                                <p className="playlist-video-channel">{playlist.snippet.channelTitle} &#183; 재생목록</p>
                                                <p className="playlist-video-meta">
                                                    {playlist.contentDetails.itemCount} 개의 동영상
                                                </p>
                                            </div>
                                        </section>
                                    ))}
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
                                                </p>
                                            </div>
                                        </section>
                                    ))}
                                </section>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}