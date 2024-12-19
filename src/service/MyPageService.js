import axios from "axios";

// 리디렉션된 url에서 code 추출한 후 Access Token과 Refresh Token 토큰 요청
export const authTokenAPI = async (authCode) => {
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

export const extractAuthCode = async () => {
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

export const refreshAccessToken = async () => {
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

export const fetchYouTubeData = async (url, accessToken, params = {}) => {
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
export const fetchChannelProfileImage = async (accessToken) => {
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
export const fetchLikedVideos = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = {part: "snippet,contentDetails,statistics", myRating: "like", maxResults: 15};
    return await fetchYouTubeData(url, accessToken, params);
};

// 채널 ID 가져오기
export const fetchChannelId = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/channels";
    const params = {part: "snippet", mine: true};
    const data = await fetchYouTubeData(url, accessToken, params);
    return data.length > 0 ? data[0].id : null;
};

// 사용자 채널 정보 가져오기
export const fetchUserChannel = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/channels";
    const params = {part: "snippet,contentDetails", mine: true, maxResults: 10};
    return await fetchYouTubeData(url, accessToken, params);
};

// 사용자 재생목록 가져오기
export const fetchUserPlaylists = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/playlists";
    const params = {part: "snippet,contentDetails", mine: true, maxResults: 25};
    return await fetchYouTubeData(url, accessToken, params);
};

// 유튜브 재생목록 가져오기
export const fetchYouTubePlaylists = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/playlists";
    const params = {part: "snippet,contentDetails"};
    return await fetchYouTubeData(url, accessToken, params);
};

// 나중에 볼 동영상 가져오기
export const fetchWatchLaterVideos = async (accessToken) => {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    const params = {part: "snippet,contentDetails", playlistId: "WL", maxResults: 25};
    return await fetchYouTubeData(url, accessToken, params);
};

// 첫 번째 동영상 ID 가져오기
export const fetchFirstVideoId = async (accessToken, playlistId) => {
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";
    const params = {part: "snippet", playlistId, maxResults: 1};
    const data = await fetchYouTubeData(url, accessToken, params);
    return data.length > 0 ? data[0].snippet.resourceId.videoId : null;
};


// 빈 재생목록 제거
export const filterValidPlaylists = (playlists) => {
    return playlists.filter((playlist) => {
        // contentDetails.itemCount를 확인해 영상이 있는 재생목록만 반환
        return playlist.contentDetails && playlist.contentDetails.itemCount > 0;
    });
};

// 추가 데이터 요청
export const fetchAdditionalPlaylists = async (accessToken, nextPageToken) => {
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

// 재생목록이 무족하면 재귀적 요청
export const fetchAllPlaylists = async (accessToken) => {
    let playlists = [];
    let nextPageToken = null;

    do {
        const response = await fetchAdditionalPlaylists(accessToken, nextPageToken);

        if (response) {
            // 추가된 재생목록을 필터링
            const validPlaylists = filterValidPlaylists(response.items);
            playlists = playlists.concat(validPlaylists); // 유효한 재생목록을 추가

            nextPageToken = response.nextPageToken; // 다음 페이지 토큰
        } else {
            nextPageToken = null; // 에러 발생 시 루프 중단
        }
    } while (nextPageToken && playlists.length < 13); // 총 13개의 유효한 재생목록이 채워질 때까지 반복

    return playlists;
};