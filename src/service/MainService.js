import instance from "../api/api";
import requests from "../api/endpoint";
import formatTimeDifference from "../utils/formatTimeDifference";
import formatViewPeople from "../utils/formatViewPeople";
import formatVideoTime from "../utils/formatVideoTime";
import { getChannelThumbnail } from "../utils/formatProfileImage";

//메인 동영상 가져오기
export const getMainVideos = async (categoryId = null, pageToken = null) => {
    try {
        const params = {
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            regionCode: "KR",
            maxResults: 12,
        };

        if (categoryId) {
            params.videoCategoryId = categoryId;
        }
        if (pageToken) {
            params.pageToken = pageToken; // 다음 페이지를 가져오기 위한 토큰
        }

        const response = await instance.get(requests.getMainVideos, { params });

        const nextPageToken = response.data.nextPageToken; // 다음 페이지 토큰
        const results = await Promise.allSettled(
            response.data.items.map(async (item) => {
                try {
                    const channelThumbnail = await getChannelThumbnail(item.snippet.channelId);

                    return {
                        videoId: item.id,
                        title: item.snippet.title,
                        author: item.snippet.channelTitle,
                        thumbnail: item.snippet.thumbnails.medium.url,
                        time: formatVideoTime(item.contentDetails.duration),
                        profile: channelThumbnail,
                        stats: `조회수 ${formatViewPeople(item.statistics.viewCount)} · ${formatTimeDifference(item.snippet.publishedAt)}`,
                        channelId: item.snippet.channelId,
                    };
                } catch (error) {
                    console.error(`Error fetching thumbnail for item ${item.id}:`, error.message);
                    return null;
                }
            })
        );

        return {
            videos: results
                .filter((result) => result.status === "fulfilled" && result.value !== null)
                .map((result) => result.value),
            nextPageToken, // 다음 페이지 토큰 반환
        };
    } catch (error) {
        console.error("Error fetching main videos:", error.message);
        return { videos: [], nextPageToken: null };
    }
};
