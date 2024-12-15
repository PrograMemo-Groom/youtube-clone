import instance from "../api/api";
import requests from "../api/endpoint";

export const fetchShortsVideos = async (query = "Faker") => {
  try {
    const {
      data: { items: response },
    } = await instance.get(requests.fetchGetSearch, {
      params: {
        part: "snippet",
        regionCode: "KR",
        maxResults: 4,
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
