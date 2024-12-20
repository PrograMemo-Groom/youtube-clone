import axios from "axios";
import {API_URL} from "../config/config";

export const fetchYouTubeData = async (endpoint, accessToken, params
    // option
    = {}) => {
    if (!accessToken) {
        console.error("Access token not found. Please log in again.");
        return null;
    }

    const url = `${API_URL}/${endpoint}`;
    try {
        const {data: {item: response}} = await axios.get(url, {
            // const response = await axios.get(url, {
            // const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${accessToken}`},
            params: {
                ...params},
            // myRating: option?.myRating || "",
            // maxResults: 15,
            // mine: option?.mine || "",
            // },
        });
        return response.data.items || [];
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error.response?.data || error.message);
        return null;
    }
};

// 좋아요한 영상 가져오기
export const fetchLikedVideos = async (accessToken) => {
    const url = `${API_URL}/videos`;
    const params = {
        part: "snippet,contentDetails,statistics",
        myRating: "like",
        maxResults: 13
    };
    return await fetchYouTubeData("videos", accessToken, params);
};

// 채널 ID 가져오기
export const fetchChannelId = async (accessToken) => {
    const url = `${API_URL}channels`;
    const params = {
        part: "snippet",
        mine: true,
    };
    const data = await fetchYouTubeData("channels", accessToken, params);
    return data.length > 0 ? data[0].id : null;
};

// 사용자 채널 정보 가져오기
export const fetchUserChannel = async (accessToken) => {
    return await fetchYouTubeData("channels", accessToken);
};

// 사용자 재생목록 가져오기
export const fetchUserPlaylists = async (accessToken) => {
    return await fetchYouTubeData("playlists", accessToken,);
};

// 유튜브 재생목록 가져오기
export const fetchYouTubePlaylists = async (accessToken) => {
    return await fetchYouTubeData("playlists", accessToken);
};

// 나중에 볼 동영상 가져오기
export const fetchWatchLaterVideos = async (accessToken) => {
    const url = `${API_URL}/playlistItems`;
    const params = {
        part: "snippet,contentDetails",
        playlistId: "WL",
        maxResults: 13
    };
    return await fetchYouTubeData("playlistItems", accessToken, params);
};

// 첫 번째 동영상 ID 가져오기
export const fetchFirstVideoId = async (accessToken, playlistId) => {
    const url = `${API_URL}/playlistItems`;
    const params = {part: "snippet", playlistId, maxResults: 1};
    const data = await fetchYouTubeData(url, accessToken, params);
    return data.length > 0 ? data[0].snippet.resourceId.videoId : null;
};