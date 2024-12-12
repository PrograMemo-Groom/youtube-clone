import instance from "../api/api";
import requests from "../api/endpoint";

const tag = '[Service]';
export const fetchPopularVideos = async () => {
    try{
        const {data: {items : response}} = await instance.get(requests.fetchPopularVideos, {
            params: {
                part: "snippet,statistics,player",
                chart: "mostPopular",
                regionCode: "KR",
                maxResults: 10,
            }

            /* part: 가져올 데이터의 종류 (예: snippet, statistics, contentDetails 등).
            - snippet: 동영상의 기본 메타데이터. (제목(title), 설명(description), 채널 정보(channelTitle), 썸네일(thumbnail) 등이 포함)
            - statistics: 동영상의 통계 데이터. (조회수(viewCount), 좋아요 수(likeCount), 댓글 수(commentCount) 등을 제공)
            - contentDetails: 동영상의 상세 정보. (동영상 길이(duration), 콘텐츠 등급(contentRating) 등이 포함)
            - player: 동영상을 삽입(embed)할 수 있는 HTML 코드.
            - status: 동영상의 상태. (공개 상태(public/private), 라이선스 정보 등이 포함)
             */
            // chart: mostPopular를 설정.
            // regionCode: 국가 코드 (예: KR, US, JP).
            // maxResults: 한번의 요청에서 결과 개수 (기본: 5, 최대: 50).
        });
        console.log(tag, "fetchPopularVideos response",response);
        return response;
    } catch (e) {
        console.log(tag, "PopularVideos can't get response data", e);
    }
}

export const fetchSearchVideos = async (keyword) => {
    try {
        const {data: response} = await instance.get(requests.fetchSearchVideos, {
            params: {
                part: "snippet",
                q: keyword,
                regionCode: "KR",
                maxResults: 10,
                type: "video"
            }
        });
        console.log("response",response);
        // 떨어지는 data 가공
        const items = response.items.map((item) => ({
            videoId: item.id.videoId,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet?.description,
            publishTime: item.snippet.publishTime,
            defaultThumbnail: item.snippet.thumbnails.default,
            highThumbnail: item.snippet.thumbnails.high,
            mediumThumbnail: item.snippet.thumbnails.medium,
            title: item.snippet.title,
        }))
        // console.log("items", items);
        const result = {
            pageToken: response?.nextPageToken,
            items: items
        }
        console.log(tag, "fetchSearchVideos response", result);
        return result;
    } catch (e) {
        console.log(tag, "SearchVideos can't get response data", e);
    }
}

// ISO 8601 형식의 duration을 사람이 읽을 수 있는 시간으로 변환
const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    return `${hours ? `${hours}:` : ""}${minutes ? minutes.padStart(2, "0") : "00"}:${seconds.padStart(2, "0")}`;
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
        const videos = await Promise.all(
            response.data.items.map(async (item) => {
                const channelResponse = await instance.get(requests.getMainVideos,{
                    params: {
                        part: "snippet",
                        id: item.snippet.channelId,
                    },
                });

                const channelThumbnail =
                    channelResponse.data.items[0]?.snippet?.thumbnails?.default?.url || "";

                return {
                    videoId: item.id,
                    title: item.snippet.title,
                    author: item.snippet.channelTitle,
                    thumbnail: item.snippet.thumbnails.high.url,
                    time: formatDuration(item.contentDetails.duration),
                    profile: channelThumbnail,
                    stats: `조회수 ${item.statistics.viewCount}회 · ${new Date(item.snippet.publishedAt).toLocaleDateString()}`,
                };
            })
        );

        return videos;
    } catch (error) {
        console.error("Error fetching main videos:", error.message);
        return [];
    }
};