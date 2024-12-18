import {API_KEY, API_URL} from "../config/config";

export const fetchCreatorVideos = async (channelId, maxResults = 1, nextPageToken = "") => {
    const url = `${API_URL}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&type=video&key=${API_KEY}&pageToken=${nextPageToken}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            const videoList = data.items.map((item) => ({
                videoId: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                channelTitle: item.snippet.channelTitle,
                videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            }));

            return {
                videos: videoList,
                nextPageToken: data.nextPageToken || null, // 다음 페이지 토큰
            };
        } else {
            return {videos: [], nextPageToken: null};
        }
    } catch (error) {
        console.error("Error fetching creator's videos:", error);
        throw new Error("크리에이터의 다른 영상을 불러오는 중 오류가 발생했습니다.");
    }
};
