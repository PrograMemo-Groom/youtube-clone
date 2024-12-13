import instance from "../api/api";
import requests from "../api/endpoint";

const tag = '[SearchService]';

export const fetchSearchList = async (keyword) => {
    try {

        const getVideo = await fetchSearchVideos(keyword);
        // console.log(`${tag} - fetchSearchList`, getVideo);
        const videoResult = await Promise.all(
            getVideo.results.map(async (item) => {
                const videoDetails = await fetchGetVideoDetails(item.videoId);
                return { ...item, ...videoDetails.video };
            })
        );
        console.log(`${tag} - result`, videoResult);
        return {
            pageToken: getVideo.pageToken,
            items: videoResult
        }
    } catch (e) {
        console.trace(`${tag} - `,e.message);
    }
}

/* 검색창에서 검색 시 videoId list get() */
export const fetchSearchVideos = async (keyword) => {
    try {
        const {data: response} = await instance.get(requests.fetchSearchVideos, {
            params: {
                part: "snippet", q: keyword, regionCode: "KR", type: "video", maxResults: 3
            }
        });
        const results = response.items.map((item) => ({
            videoId: item.id.videoId,
        }))
        return {
            pageToken: response?.nextPageToken,
            results
        }
    } catch (e) {
        console.log(tag, "SearchVideos can't get response data", e);
    }
}

export const fetchGetVideoDetails = async (videoId) => {
    try{
        const {data: {items : response}} = await instance.get(requests.getMainVideos, {
            params: {
                part: "snippet,statistics", id: videoId, regionCode: "KR", maxResults: 1
            }
        });
        const results = {
            video: {
                title: response[0].snippet.title,
                description: response[0].snippet.description,
                channelTitle: response[0].snippet.channelTitle,
                thumbnails: response[0].snippet.thumbnails.default.url,
                publishedAt: response[0].snippet.publishedAt,
                statistics: {
                    viewCount: response[0].statistics.viewCount,
                    likeCount: response[0].statistics.likeCount,
                    favoriteCount: response[0].statistics.favoriteCount,
                    commentCount: response[0].statistics.commentCount,
                },
                channel: {
                    channelId: response[0].snippet.channelId,
                    channelTitle: response[0].snippet.channelTitle,
                }
            }
        }
        return results;
    } catch (e) {
        console.log(tag, "fetchGetVideoDetails can't get response data", e);
    }
}


