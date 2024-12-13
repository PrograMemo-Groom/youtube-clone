import instance from "../api/api";
import requests from "../api/endpoint";

export const getChannelThumbnail = async (channelId) => {
    try {
        const response = await instance.get(requests.fetchChannelDetails, {
            params: {
                part: "snippet",
                id: channelId,
            },
        });

        // 채널 프로필 썸네일 반환
        return response.data.items[0]?.snippet?.thumbnails?.default?.url || "";
    } catch (error) {
        console.error("채널 이미지 오류 발생:", error.message);
        return ""; // 오류 발생 시 기본 빈 문자열 반환
    }
};
