import instance from "../api/api";
import requests from "../api/endpoint";
import formatVideoTime from "../utils/formatVideoTime";
import formatViewPeople from "../utils/formatViewPeople";
import formatTimeDifference from "../utils/formatTimeDifference";

const tag = '[SearchService]';

export const fetchSearchList = async (keyword) => {
    try {
        const {nextPageToken, results} = await getSearchVideoList(keyword);
        return {
            pageToken: nextPageToken,
            items: await Promise.all(
                results.map(async (item) => {
                    const {video} = await getVideoDetails(item.videoId);
                    const channel = await getChannelData(item.channel.channelId);
                    return { ...item, ...video, channel: { ...video.channel, ...channel } }
                })
            )
        }
    } catch (e) {
        console.trace(`${tag} - `,e.message);
    }
}

export const getChannelData = async (channelId) => {
    // console.log(`${tag} Channel 정보 가져오기`);
    try {
        const {data: {items: [response]}} = await instance.get(requests.fetchGetChannel, {
            params:{ part: "snippet", id: channelId, regionCode: "KR", maxResults: 1 }})
        const {snippet : {title, customUrl, thumbnails}} = response;
        return {
            title,
            customUrl: `https://youtube.com/${customUrl}`,
            channelImg: thumbnails.default.url
        }
        // console.log(`${tag} Channel 정보 가져왔음!`,channelResult);
    } catch (e) {
        console.trace(tag, "getChannelData can't get response data", e);
    }
}
export const getSearchVideoList = async (keyword) => {
    // console.log(`${tag} 검색된 비디오[] 가져오기`);
    try {
        const {data: items, nextPageToken} = await instance.get(requests.fetchGetSearch, {
            params: { part: "snippet", q: keyword, regionCode: "KR", type: "video", maxResults: 3 }});

        return {
            nextPageToken,
            results: items.map(({ id:{videoId}, snippet:{channelId} }) => ({
                videoId, channel: { channelId }
            }))
        }
        // console.log(`${tag} 검색된 비디오[] 가져왔음`,videoListResult);
    } catch (e) {
        console.trace(tag, "fetchSearchVideos can't get response data", e);
    }
}

export const getVideoDetails = async (videoId) => {
    // console.log(`${tag} 비디오(id)에 대한 정보 가져오기`);
    try{
        const {data: {items:[response]}} = await instance.get(requests.fetchGetVideo, {
            params: {
                part: "snippet,statistics,contentDetails", id: videoId, regionCode: "KR", maxResults: 1
            }
        });
        const {
            snippet: {title, description, channelTitle, thumbnails, publishedAt, channelId },
            statistics: { viewCount, likeCount, favoriteCount, commentCount },
            contentDetails: { duration }
        } = response;
        return {
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
        // console.log(`${tag} 비디오(id)에 대한 정보 가져왔음`,detailResult);
    } catch (e) {
        console.log(tag, "getVideoDetails can't get response data", e);
    }
}


