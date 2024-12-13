import instance from "../api/api";
import requests from "../api/endpoint";

// 채널 프로필 이미지 요청 함수
const getChannelThumbnail = async (channelId) => {
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


// ISO 8601 형식의 duration을 사람이 읽을 수 있는 시간으로 변환
const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    return `${hours ? `${hours}:` : ""}${minutes ? minutes.padStart(2, "0") : "00"}:${seconds.padStart(2, "0")}`;
};

// 동영상 시간 표현 방식
const formatViewCount = (viewCount) => {
    if (viewCount >= 100000000) {
        return `${Math.floor(viewCount / 100000000)}억회`;
    } else if (viewCount >= 1000000) {
        return `${Math.floor(viewCount / 10000)}만회`;
    } else if (viewCount >= 10000) {
        // 1만 단위 이상 (1만부터는 천회 대신 만회로 변경)
        return `${Math.floor(viewCount / 10000)}만회`;
    } else if (viewCount >= 1000) {
        // 1천 단위 이상 (1만 미만은 천회로 표시)
        return `${Math.floor(viewCount / 1000)}천회`;
    }
    // 1천 미만 그대로 반환
    return `${viewCount}회`;
};

// 동영상 게시 일자 표현 : 현재 - 게시일
const formatPublishedDate = (publishedDate) => {
    const now = new Date();
    const published = new Date(publishedDate);
    const Seconds = Math.floor((now - published) / 1000);

    const Minute = 60;
    const Hour = 60 * Minute;
    const Day = 24 * Hour;
    const Month = 30 * Day;
    const Year = 12 * Month;

    if (Seconds < Day) {
        const hours = Math.floor(Seconds / Hour);
        return `${hours}시간 전`;
    } else if (Seconds < Month) {
        const days = Math.floor(Seconds / Day);
        return `${days}일 전`;
    } else if (Seconds < Year) {
        const months = Math.floor(Seconds / Month);
        return `${months}개월 전`;
    } else {
        const years = Math.floor(Seconds / Year);
        return `${years}년 전`;
    }
};


//메인 동영상 가져오기
export const getMainVideos = async () => {
    try {
        const response = await instance.get(requests.getMainVideos, {
            params: {
                part: "snippet,contentDetails,statistics",
                chart: "mostPopular",
                regionCode: "KR",
                maxResults: 32,
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
                    time: formatDuration(item.contentDetails.duration),
                    profile: channelThumbnail,
                    stats: `조회수 ${formatViewCount(item.statistics.viewCount)} · ${formatPublishedDate(item.snippet.publishedAt)}`,
                };
            })
        );
    } catch (error) {
        console.error("Error fetching main videos:", error.message);
        return [];
    }
};