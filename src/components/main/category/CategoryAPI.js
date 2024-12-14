import instance from "../../../api/api";
import requests from "../../../api/endpoint";
import formatViewPeople from "../../../utils/formatViewPeople";
import formatTimeDifference from "../../../utils/formatTimeDifference";
import formatVideoTime from "../../../utils/formatVideoTime";
import { getChannelThumbnail } from "../../../utils/formatProfileImage";

// 최근에 업로드된 동영상
export const fetchRecentlyUploaded = async () => {
    try {
        const response = await instance.get(requests.fetchSearchVideos, {
            params: {
                part: "snippet",
                order: "date",
                maxResults: 10,
            },
        });
        console.log("fetchRecentlyUploaded data:", response.data.items);

        const results = await Promise.all(
            response.data.items.map(async (item) => {
                const channelThumbnail = await getChannelThumbnail(item.snippet.channelId);

                return {
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    author: item.snippet.channelTitle,
                    thumbnail: item.snippet.thumbnails.high.url,
                    time: item.contentDetails?.duration
                        ? formatVideoTime(item.contentDetails.duration)
                        : "알 수 없음",
                    profile: channelThumbnail,
                    stats: `조회수 ${formatViewPeople(item.statistics?.viewCount || 0)} · ${formatTimeDifference(item.snippet.publishedAt)}`,
                };
            })
        );

        return results;
    } catch (error) {
        console.error("Error fetching recently uploaded videos:", error.message);
        return [];
    }
};

// 맞춤 추천 동영상
export const fetchPersonalizedVideos = async () => {
    try {
        const response = await instance.get(requests.fetchSearchVideos, {
            params: {
                part: "snippet",
                order: "relevance",
                maxResults: 10,
            },
        });
        console.log("fetchPersonalizedVideos data:", response.data.items);

        const results = await Promise.all(
            response.data.items.map(async (item) => {
                const channelThumbnail = await getChannelThumbnail(item.snippet.channelId);

                return {
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    author: item.snippet.channelTitle,
                    thumbnail: item.snippet.thumbnails.high.url,
                    time: item.contentDetails?.duration
                        ? formatVideoTime(item.contentDetails.duration)
                        : "알 수 없음",
                    profile: channelThumbnail,
                    stats: `조회수 ${formatViewPeople(item.statistics?.viewCount || 0)} · ${formatTimeDifference(item.snippet.publishedAt)}`,
                };
            })
        );

        return results;
    } catch (error) {
        console.error("Error fetching personalized videos:", error.message);
        return [];
    }
};



// // 사용자 플레이리스트 가져오기
// export const fetchPlaylists = async () => {
//     const accessToken = localStorage.getItem("GOOGLE_TOKEN");
//     if (!accessToken) {
//         console.error("No access token found. Please log in.");
//         return null;
//     }
//
//     try {
//         const response = await instance.get("https://www.googleapis.com/youtube/v3/playlists", {
//             params: {
//                 part: "snippet",
//                 mine: true, // 사용자의 플레이리스트만 가져오기
//                 maxResults: 50,
//             },
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//
//         console.log("fetchPlaylists data:", response.data.items);
//         const watchHistoryPlaylist = response.data.items.find(
//             (playlist) => playlist.snippet.title === "Watch History"
//         );
//
//         if (watchHistoryPlaylist) {
//             return watchHistoryPlaylist.id;
//         } else {
//             console.error("Watch History playlist not found.");
//             return null;
//         }
//     } catch (error) {
//         console.error(
//             "Error fetching playlists:",
//             error.response?.data || error.message
//         );
//         return null;
//     }
// };
//
// // 감상한 동영상 가져오기
// export const fetchWatchHistory = async () => {
//     const accessToken = localStorage.getItem("GOOGLE_TOKEN");
//     if (!accessToken) {
//         console.error("No access token found. Please log in.");
//         return [];
//     }
//
//     // Watch History Playlist ID 가져오기
//     const playlistId = await fetchPlaylists();
//     if (!playlistId) {
//         console.error("Could not find Watch History playlist.");
//         return [];
//     }
//
//     try {
//         const response = await instance.get("https://www.googleapis.com/youtube/v3/playlistItems", {
//             params: {
//                 part: "snippet,contentDetails",
//                 playlistId: playlistId, // 동적으로 가져온 Watch History Playlist ID
//                 maxResults: 10,
//             },
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//
//         console.log("fetchWatchHistory data:", response.data.items);
//         return response.data.items.map((item) => ({
//             videoId: item.contentDetails.videoId,
//             title: item.snippet.title,
//             author: item.snippet.channelTitle,
//             thumbnail: item.snippet.thumbnails.high.url,
//             stats: `조회수 정보 없음 · ${item.snippet.publishedAt}`,
//         }));
//     } catch (error) {
//         console.error(
//             "Error fetching watch history:",
//             error.response?.data || error.message
//         );
//         return [];
//     }
// };



