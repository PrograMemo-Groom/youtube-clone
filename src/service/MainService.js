import instance from "../api/api";
import requests from "../api/endpoint";
import formatTimeDifference from "../utils/formatTimeDifference";
import formatViewPeople from "../utils/formatViewPeople";
import formatVideoTime from "../utils/formatVideoTime";
import { getChannelThumbnail } from "../utils/formatProfileImage";

//메인 동영상 가져오기
export const getMainVideos = async () => {
    try {
        const response = await instance.get(requests.getMainVideos, {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                regionCode: "KR",
                maxResults: 4,
            },
        });
        // 동영상 데이터 가공
        return Promise.all(
            response.data.items.map(async (item) => {
                const channelThumbnail = await getChannelThumbnail(item.snippet.channelId);

                return {
                    videoId: item.id,
                    title: item.snippet.title,
                    author: item.snippet.channelTitle,
                    thumbnail: item.snippet.thumbnails.high.url,
                    time: formatVideoTime(item.contentDetails.duration),
                    profile: channelThumbnail,
                    stats: `조회수 ${formatViewPeople(item.statistics.viewCount)} · ${formatTimeDifference(item.snippet.publishedAt)}`,
                };
            })
        );
    } catch (error) {
        console.error("Error fetching main videos:", error.message);
        return [];
    }
};