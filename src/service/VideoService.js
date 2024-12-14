import instance from "../api/api";
import requests from "../api/endpoint";

const tag = "[Service]";
export const fetchPopularVideos = async () => {
  try {
    const {
      data: { items: response },
    } = await instance.get(requests.fetchPopularVideos, {
      params: {
        part: "snippet,statistics,player",
        chart: "mostPopular",
        regionCode: "KR",
        maxResults: 10,
      },

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
    console.log(tag, "fetchPopularVideos response", response);
    return response;
  } catch (e) {
    console.log(tag, "PopularVideos can't get response data", e);
  }
};

export const fetchSubscriptions = async (token) => {
  try {
    const {
      data: { items: response },
    } = await instance.get(requests.fetchSubscriptions, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        part: "snippet",
        mine: true,
        regionCode: "KR",
        maxResults: 10,
      },
    });
    console.log(tag, "fetchPopularVideos response", response);
    return response;
  } catch (e) {
    console.log(tag, "PopularVideos can't get response data", e);
  }
};

export const fetchShortsVideos = async (query = "Faker") => {
  try {
    const {
      data: { items: response },
    } = await instance.get(requests.fetchGetSearch, {
      params: {
        part: "snippet",
        regionCode: "KR",
        maxResults: 10,
        q: query,
        videoDuration: "short", // 짧은 영상 필터링
        type: "video",
      },
    });
    // console.log("fetchShortsVideos response",response);
    return response;
  } catch (e) {
    console.log("fetchShortsVideo can't get response data", e);
  }
};

export const fetchVideoDetail = async (videoId) => {
  if (!videoId) return; // videoId가 없으면 요청 안 함

  try {
    const response = await instance.get(requests.getMainVideos, {
      params: {
        part: "snippet,statistics,contentDetails,player",
        id: videoId,
      },
    });
    console.log("response", response);
    const items = response.data.items[0];
    console.log("items", items);

    return items;
  } catch (error) {
    console.error("영상 정보를 가져오는 중 오류 발생:", error.message);
  }
};
