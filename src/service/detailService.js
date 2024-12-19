import instance from "../api/api";
import requests from "../api/endpoint";

const tag = "[Service]";
export const fetchVideoDetails = async (videoId) => {
    if (!videoId) return;

    try {
        const response = await instance.get(requests.fetchPopularVideos, {
            params: {
                part: "snippet,statistics,contentDetails",
                regionCode: "KR",
                maxResults: 1,
                id: videoId,
            },
        });

        return {videoData: response.data.items[0], channelId: response.data.items[0].snippet.channelId}
    } catch (e) {
        console.log(tag, "PopularVideos can't get response data", e);
    }
};

