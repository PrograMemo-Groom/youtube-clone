// API 요청 모듈 및 요청 경로 정의 파일 import
import instance from "../api/api"; // Axios 인스턴스가 정의된 파일
import requests from "../api/endpoint"; // API 요청 경로가 정의된 파일

/**
 * getChannelThumbnail
 * - 주어진 채널 ID를 사용하여 YouTube API로부터 채널의 프로필 썸네일 URL을 가져오는 함수.
 *
 * @param {string} channelId - YouTube 채널의 고유 ID
 * @returns {Promise<string>} - 채널 프로필 썸네일 URL (오류 발생 시 빈 문자열 반환)
 */
export const getChannelThumbnail = async (channelId) => {
    try {
        // YouTube API 요청 보내기
        const response = await instance.get(requests.fetchChannelDetails, {
            params: {
                part: "snippet", // 필요한 데이터의 부분 (snippet) 지정
                id: channelId,   // 요청할 채널의 ID
            },
        });

        // 응답 데이터에서 채널 썸네일 URL 추출
        // 응답 형식: items 배열의 첫 번째 객체 → snippet → thumbnails → default → url
        // 값이 없을 경우 빈 문자열("") 반환
        return response.data.items[0]?.snippet?.thumbnails?.default?.url || "";
    } catch (error) {
        // 오류 발생 시 콘솔에 에러 메시지를 출력
        console.error("채널 이미지 오류 발생:", error.message);

        // 오류 발생 시 빈 문자열 반환 (기본값 처리)
        return "";
    }
};
