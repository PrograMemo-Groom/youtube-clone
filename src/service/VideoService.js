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

//메인 동영상 가져오기
export const getMainVideos = async () => {
    try {
        const response = await instance.get(requests.getMainVideos, {
            params: {
                part: "snippet,statistics", // 필요한 데이터: 제목, 썸네일, 채널명, 조회수 등
                chart: "mostPopular",
                regionCode: "KR",
                maxResults: 16,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error("Error fetching main videos:", error);
        return [];
    }
};