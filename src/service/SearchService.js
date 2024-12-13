import instance from "../api/api";
import requests from "../api/endpoint";
import formatVideoTime from "../utils/formatVideoTime";
import formatViewPeople from "../utils/formatViewPeople";
import formatTimeDifference from "../utils/formatTimeDifference";

const tag = '[SearchService]';

export const fetchSearchList = async (keyword) => {
    try {

        const getVideo = await fetchSearchVideos(keyword);
        const videoResult = await Promise.all(
            getVideo.results.map(async (item) => {
                const videoDetails = await fetchGetVideoDetails(item.videoId);
                const channel = await getChannelData(item.channel.channelId);
                return {
                    ...item,
                    ...videoDetails.video,
                    channel: {
                        ...videoDetails.video.channel,
                        ...channel
                    }
                }
            })
        );
        return {
            pageToken: getVideo.pageToken,
            items: videoResult
        }
    } catch (e) {
        console.trace(`${tag} - `,e.message);
    }
}

export const getChannelData = async (channelId) => {
    try {
        const {data: {items: response}} = await instance.get(requests.fetchChannelDetails, {
            params:{
                part: "snippet", id: channelId, regionCode: "KR", maxResults: 1
            }
        })
        const {snippet : {title, customUrl, thumbnails}} = response[0];

        const channel = {
            title,
            customUrl: `https://youtube.com/${customUrl}`,
            channelImg: thumbnails.default.url
        }

        return channel;

    } catch (e) {
        console.log(tag, "getChannelData can't get response data", e);
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
            channel: {
                channelId: item.snippet.channelId
            }
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
        const {data: {items:response}} = await instance.get(requests.getMainVideos, {
            params: {
                part: "snippet,statistics,contentDetails", id: videoId, regionCode: "KR", maxResults: 1
            }
        });
        const {
            snippet: {title, description, channelTitle, thumbnails, publishedAt, channelId },
            statistics: { viewCount, likeCount, favoriteCount, commentCount },
            contentDetails: { duration }
        } = response[0];
        const results = {
            video: {
                title,
                description,
                channelTitle,
                thumbnailImg: thumbnails.default.url,
                videoCreated: formatTimeDifference(publishedAt),
                videoTime: formatVideoTime(duration),
                statistics: {
                    viewCount: formatViewPeople(viewCount),
                    likeCount: formatViewPeople(likeCount),
                    favoriteCount,
                    commentCount,
                },
                channel: {
                    channelId,
                    channelTitle,
                }
            }
        }
        return results;
    } catch (e) {
        console.log(tag, "fetchGetVideoDetails can't get response data", e);
    }
}


