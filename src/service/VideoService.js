import instance from "../api/api";
import requests from "../api/endpoint";

const tag = '[Service]';
export const fetchPopularVideos = async () => {
    try{
        const {data: {items : response}} = await instance.get(requests.fetchPopularVideos, {
            params: {
                part: "snippet,statistics",
                chart: "mostPopular",
                regionCode: "KR",
                maxResults: 10,
            }
        });
        console.log(tag, "fetchPopularVideos response",response);
        return response;
    } catch (e) {
        console.log(tag, "PopularVideos can't get response data", e);
    }
}