import "./MyPage.css";
import "./SortDropdown.css"
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import Profile from "./component/Profile";
import Record from "./component/Record";
import Playlist from "./component/Playlist";
import WatchVideos from "./component/WatchVideos";

const handleLogin = () => {
    try {
        const scope = encodeURIComponent("email profile https://www.googleapis.com/auth/youtube.readonly");
        const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

        // localStorage.removeItem("ACCESS_TOKEN");
        // localStorage.removeItem("REFRESH_TOKEN");
        // localStorage.removeItem("GOOGLE_TOKEN");

        console.log("Redirecting to Google OAuth for a new Authorization Code...");
        window.location.href = authUrl; // Google OAuth 로그인 리디렉션
    } catch (error) {
        console.log("[handleLogin error] 실패 0:", error.message);
    }
};

// 리디렉션된 url에서 code 추출한 후 Access Token과 Refresh Token 토큰 요청
const authTokenAPI = async (authCode) => {
    console.log("[authTokenAPI] 1: ", authCode);

    try {
        const params = new URLSearchParams();
        params.append("code", authCode);
        params.append("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID);
        params.append("client_secret", process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
        params.append("redirect_uri", process.env.REACT_APP_REDIRECT_URI);
        params.append("grant_type", "authorization_code");

        console.log("Request Params:", {
            code: authCode,
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            grant_type: "authorization_code",
        });

        const response = await axios.post("https://oauth2.googleapis.com/token", params, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        });

        console.log("Access Token:", response.data.access_token);
        console.log("Refresh Token:", response.data.refresh_token);

        localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
        localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);

        return response.data; // 토큰 반환

    } catch (error) {
        console.error("Error exchanging authorization code for tokens:", error.response?.data || error.message);
        return null;
    }
};

const extractAuthCode = async () => {
    console.log("[extractAuthCode] Extracting Authorization Code...");
    console.log("Current URL:", window.location.href);

    let code = null;

    // URL에서 Authorization Code 추출
    const urlParams = new URLSearchParams(window.location.search);
    code = urlParams.get("code");

    if (!code) {
        console.warn("No Authorization Code found in current URL. Checking referrer...");

        // 이전 페이지의 URL(referrer)에서 code 추출
        const referrer = document.referrer;
        console.log("Referrer URL:", referrer);

        if (referrer) {
            const referrerParams = new URLSearchParams(new URL(referrer).search);
            code = referrerParams.get("code");
        }
    }

    if (code) {
        console.log("Authorization Code found:", code);

        // 추출한 code를 로컬 스토리지에 저장
        localStorage.setItem("GOOGLE_TOKEN", code);
        console.log("Authorization Code saved to localStorage:", code);

        // URL에서 code 제거 (중복 실행 방지)
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        console.warn("Authorization Code not found in URL or referrer.");
        return; // code가 없으면 함수 종료
    }

    // 기존 Access Token 확인 및 갱신
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        console.log("Access Token already exists. Skipping token request.");

        const newToken = await refreshAccessToken();
        if (newToken) {
            console.log("Access Token refreshed successfully.");
            return;
        }
    }

    // Authorization Code로 토큰 요청
    try {
        console.log("Exchanging Authorization Code for tokens...");
        const tokenData = await authTokenAPI(code);

        if (tokenData) {
            console.log("Tokens retrieved successfully:", tokenData);

            // Access Token과 Refresh Token 저장
            localStorage.setItem("ACCESS_TOKEN", tokenData.access_token);
            localStorage.setItem("REFRESH_TOKEN", tokenData.refresh_token);
        } else {
            console.error("Failed to retrieve tokens. Please log in again.");
        }
    } catch (error) {
        console.error("Error during token exchange:", error.message);
    }
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");

    if (!refreshToken) {
        console.warn("No Refresh Token found. Initiating login...");
        // handleLogin();
        return null;
    }

    try {
        const params = new URLSearchParams();
        params.append("client_id", process.env.REACT_APP_GOOGLE_CLIENT_ID);
        params.append("client_secret", process.env.REACT_APP_GOOGLE_CLIENT_SECRET);
        params.append("refresh_token", refreshToken);
        params.append("grant_type", "refresh_token");

        const response = await axios.post("https://oauth2.googleapis.com/token", params, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        });

        console.log("New Access Token:", response.data.access_token);

        // 새 Access Token 저장
        localStorage.setItem("ACCESS_TOKEN", response.data.access_token);

        return response.data.access_token;
    } catch (error) {
        console.error("Error refreshing access token:", error.response?.data || error.message);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        // handleLogin(); // Refresh Token 실패 시 새 로그인 시도
        return null;
    }
};

const fetchYouTubeData = async (url, accessToken, params = {}) => {
    if (!accessToken) {
        console.error("Access token not found. Please log in again.");
        return null;
    }

    try {
        const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${accessToken}`},
            params,
        });
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.response?.data || error.message);
        return null;
    }
};

// 채널 프로필 이미지 가져오기
const fetchChannelProfileImage = async (accessToken) => {
    try {
        const url = "https://www.googleapis.com/youtube/v3/channels";
        const params = {part: "snippet", mine: true};

        // fetchYouTubeData를 통해 API 요청
        const data = await fetchYouTubeData(url, accessToken, params);

        // 응답 검증: data가 유효한지 확인
        if (data && data.length > 0) {
            return data[0].snippet.thumbnails.default.url;
        } else {
            console.warn("No channel profile image found or items are empty.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching channel profile image:", error.response?.data || error.message);
        return null;
    }
};

// 좋아요한 영상 가져오기
const fetchLikedVideos = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = {part: "snippet,contentDetails,statistics", myRating: "like", maxResults: 15};
    return await fetchYouTubeData(url, accessToken, params);
};

// 채널 ID 가져오기
const fetchChannelId = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/channels";
    const params = {part: "snippet", mine: true};
    const data = await fetchYouTubeData(url, accessToken, params);
    return data.length > 0 ? data[0].id : null;
};

// 사용자 채널 정보 가져오기
const fetchUserChannel = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/channels";
    const params = {part: "snippet,contentDetails", mine: true, maxResults: 10};
    return await fetchYouTubeData(url, accessToken, params);
};

// 사용자 재생목록 가져오기
const fetchUserPlaylists = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/playlists";
    const params = {part: "snippet,contentDetails", mine: true, maxResults: 25};
    return await fetchYouTubeData(url, accessToken, params);
};

// 유튜브 재생목록 가져오기
const fetchYouTubePlaylists = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/playlists";
    const params = {part: "snippet,contentDetails"};
    return await fetchYouTubeData(url, accessToken, params);
};

// 나중에 볼 동영상 가져오기
const fetchWatchLaterVideos = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    const params = {part: "snippet,contentDetails", playlistId: "WL", maxResults: 25};
    return await fetchYouTubeData(url, accessToken, params);
};

// 첫 번째 동영상 ID 가져오기
const fetchFirstVideoId = async (accessToken, playlistId) => {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    const params = {part: "snippet", playlistId, maxResults: 1};
    const data = await fetchYouTubeData(url, accessToken, params);
    return data.length > 0 ? data[0].snippet.resourceId.videoId : null;
};


// 빈 재생목록 제거
const filterValidPlaylists = (playlists) => {
    return playlists.filter((playlist) => {
        // contentDetails.itemCount를 확인해 영상이 있는 재생목록만 반환
        return playlist.contentDetails && playlist.contentDetails.itemCount > 0;
    });
};

// 추가 데이터 요청
const fetchAdditionalPlaylists = async (accessToken, nextPageToken) => {
    try {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
            headers: {Authorization: `Bearer ${accessToken}`,},
            params: {
                part: "snippet,contentDetails",
                mine: true,
                maxResults: 50,
                pageToken: nextPageToken, // 다음 페이지를 가져오기 위한 토큰
            }
        })
        return response.data;
    } catch (error) {
        console.log("Error fetchAdditionalPlaylists: ", error.response?.data || error.message);
    }
}

//  재생목록이 무족하면 재귀적 요청
// const fetchAllPlaylists = async (accessToken) => {
//     let playlists = [];
//     let nextPageToken = null;
//
//     do {
//         const response = await fetchAdditionalPlaylists(accessToken, nextPageToken);
//
//         if (response) {
//             // 추가된 재생목록을 필터링
//             const validPlaylists = filterValidPlaylists(response.items);
//             playlists = playlists.concat(validPlaylists); // 유효한 재생목록을 추가
//
//             nextPageToken = response.nextPageToken; // 다음 페이지 토큰
//         } else {
//             nextPageToken = null; // 에러 발생 시 루프 중단
//         }
//     } while (nextPageToken && playlists.length < 13); // 총 13개의 유효한 재생목록이 채워질 때까지 반복
//
//     return playlists;
// };

export default function MyPage() {
    const [playlists, setPlaylists] = React.useState([]);
    const [channelName, setChannelName] = useState("");
    const [isToggleVisible, setToggleVisible] = React.useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("가나다순");
    const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);
    const [profileImage, setProfileImage] = React.useState("/assets/myPage/user-profile.png");
    const [likedVideos, setLikedVideos] = useState([]);
    const [channelId, setChannelId] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null); // 현재 열려 있는 videoId를 저장
    const [FirstVideoId, setFirstVideoId] = useState("");
    const navigate = useNavigate();
    const {link} = useNavigation();
    const accessToken = localStorage.getItem("ACCESS_TOKEN"); // accessToken 공유
    console.log("Stored Access Token:", accessToken);

    // 인증 코드 추출 및 토큰 발급
    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            console.log("Access Token not found. Calling extractAuthCode...");
            extractAuthCode(); // Access Token이 없을 때만 호출
        } else {
            console.log("Access Token already exists. Skipping extractAuthCode.");
        }
    }, []);


    // 유튜브 데이터 요청
    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                // refreshAccessToken();
                // localStorage.removeItem("ACCESS_TOKEN");
                // localStorage.removeItem("REFRESH_TOKEN");
                // handleLogin(); // OAuth 로그인 함수 호출
                return;
            }

            try {
                // MyPage() 외부에 있는 API 함수 호출
                const channelData = await fetchUserChannel(accessToken);
                if (channelData?.length > 0) {
                    setChannelId(channelData[0].id);
                    setChannelName(channelData[0].snippet.title);
                }

                const userPlaylists = await fetchUserPlaylists(accessToken);
                setPlaylists(userPlaylists || []);

                const watchLater = await fetchWatchLaterVideos(accessToken);
                setWatchLaterVideos(watchLater || []);

                const liked = await fetchLikedVideos(accessToken);
                setLikedVideos(liked || []);

                const firstVideo = await fetchFirstVideoId(accessToken, "WL");
                setFirstVideoId(firstVideo || "");
            } catch (error) {
                console.error("Error fetching YouTube data:", error.message);
            }
        };

        fetchData();
    }, [accessToken]);

    // 프로필 이미지 불러오기
    useEffect(() => {
        const fetchProfileImage = async () => {
            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                // refreshAccessToken();
                return;
            }

            const imageUrl = await fetchChannelProfileImage(accessToken);

            // 반환된 이미지 URL 검사
            if (imageUrl) {
                setProfileImage(imageUrl);
            } else {
                console.warn("No valid profile image found. Using default image.");
                setProfileImage("/assets/mypage/user-profile.png");
            }
        };

        fetchProfileImage();
    }, [accessToken]);

    // if (!accessToken) {
    //     console.error("Access token is missing. Redirecting to login...");
    //     handleLogin(); // OAuth 로그인 함수 호출
    //     return;
    // }

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

    const handleChannelView = async () => {

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

    // 13개의 유효한 재생목록 가져옴
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         const accessToken = localStorage.getItem("ACCESS_TOKEN");
    //
    //         if (!accessToken) {
    //             console.error("Access token not found. Please log in again.");
    //             return;
    //         }
    //
    //         try {
    //             const playlists = await fetchAllPlaylists(accessToken);
    //
    //             if (playlists) {
    //                 setPlaylists(playlists); // 상태 업데이트
    //                 console.log("Filtered Playlists:", playlists);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching playlists:", error.message);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    return (
        <div className="container">
            <div className="relative-layout-container">
                <div className="absolute-layout-container">
                    <div className="contents-container">
                        <Profile/>
                        <Record/>
                        <Playlist/>
                        <WatchVideos/>
                    </div>
                </div>
            </div>
        </div>
    )
}