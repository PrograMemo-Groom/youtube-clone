import instance from "../api/api";
import requests from "../api/endpoint";
import formatVideoTime from "../utils/formatVideoTime";
import formatViewPeople from "../utils/formatViewPeople";
import formatTimeDifference from "../utils/formatTimeDifference";

const tag = '[SearchService]';

const truncate = (str, n) => {
    return str?.length > n ? str.slice(0, n - 1) +"..." : str;
}

export const fetchSearchList = async (keyword, token) => {
    try {
        const {nextPageToken, results} = await getSearchVideoList(keyword, token);
        const checkItems = await Promise.all(
            results.map(async (item) => {
                const {video} = await getVideoDetails(item.videoId);
                const channel = await getChannelData(item.channel.channelId);
                return { ...item, ...video, channel: { ...video.channel, ...channel } }
            })
        );

        return {
            pageToken: nextPageToken,
            items: checkItems.filter((item) => item !== null)
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
        // console.log(`thumbnails`,thumbnails);
        return {
            title,
            customUrl: `https://youtube.com/${customUrl}`,
            channelImg: thumbnails.high.url
        }
        // console.log(`${tag} Channel 정보 가져왔음!`,channelResult);
    } catch (e) {
        console.log(tag, "getChannelData : return null");
        // console.trace(tag, "getChannelData can't get response data", e);
        return null;
    }
}
export const getSearchVideoList = async (keyword, pageToken="") => {
    // console.log(`${tag} 검색된 비디오[] 가져오기`);
    try {
        const {data: {items, nextPageToken}} = await instance.get(requests.fetchGetSearch, {
            params: { part: "snippet", q: keyword, pageToken, regionCode: "KR", type: "video", maxResults: 1 }});
        return {
            nextPageToken,
            results: items.map(({ id:{videoId}, snippet:{channelId} }) => ({
                videoId, channel: { channelId }
            }))
        }
        // console.log(`${tag} 검색된 비디오[] 가져왔음`,videoListResult);
    } catch (e) {
        console.log(tag, "fetchSearchVideos : return null");
        // console.trace(tag, "fetchSearchVideos can't get response data", e);
        return null;
    }
}

export const getVideoDetails = async (videoId) => {
    // console.log(`${tag} 비디오(id)에 대한 정보 가져오기`);
    try{
        const {data: response} = await instance.get(requests.fetchGetVideo, {
            params: {
                part: "snippet,statistics,contentDetails", id: videoId, regionCode: "KR", maxResults: 1
            }
        });
        const {
            snippet: {title, description, channelTitle, thumbnails, publishedAt, channelId },
            statistics: { viewCount, likeCount, favoriteCount, commentCount },
            contentDetails: { duration }
        } = response.items[0];
        return {
            video: {
                title,
                description: truncate(description,100),
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
        // console.log(tag, "getVideoDetails can't get response data", e);
        console.log(tag, "getVideoDetails : return null");
        return null;
    }
}


