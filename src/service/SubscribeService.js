import instance from '../api/api';
import requests from '../api/endpoint';

const tag = '[Service]';

/////////////////// 구독 목록 가져오는 fetch함수

export const fetchSubscriptions = async (token) => {
    try {
        //구독 목록 가져오기
        const {data: {items}} = await instance.get(requests.fetchSubscriptions, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                part: "snippet",
                mine: "true",
                regionCode: "KR",
                maxResults: "10"  //변경하기 !

            }
        });

        //아이디 넘겨서 체널 디테일 가져오기
        const channelDetails = await Promise.all(
            items.map(async (item) => {
                const channelId = item.snippet.resourceId.channelId;
                const details = await fetchChannelDetails(channelId); // 채널 정보 가져오기
                return details;
            })
        );

        return channelDetails.filter(Boolean);

    } catch (e) {
        console.log(tag, "Subscriptions can't get response data", e);
    }
}

const fetchChannelDetails = async (channelId) => {
    try {
        //채널 아이디에 따른 디테일 가져오기
        const {data} = await instance.get(requests.fetchChannelDetails, {
            params: {
                part: 'statistics,snippet',
                id: channelId,
            }
        })
        const channel = data.items[0];
        return {
            id: channel.id,
            title: channel.snippet.title,
            description: channel.snippet.description,
            profileImage: channel.snippet.thumbnails.default.url,
            subscriberCount: channel.statistics.subscriberCount,
        }
    } catch (e) {
        console.log(tag, "Error fetching channel details", e);
        return null;
    }
}









/////////////////// 구독 동영상 가져오는 fetch함수

export const fetchSubscriptionsVideos = async (token) => {
    try {
        //구독 목록 가져오기
        const {data: {items}} = await instance.get(requests.fetchSubscriptions, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                part: "snippet",
                mine: "true",
                regionCode: "KR",
                maxResults: "10"  //변경하기 !
            }
        });
        console.log('구독 목록이어요 :' , items);

        //아이디 넘겨서 체널 디테일 가져오기
        const channelVideos = await Promise.all(
            items.map(async (item) => {
                const channelId = item.snippet.resourceId.channelId;
                const videos = await fetchChannelVideos(channelId , token);  // 최신 동영상 가져오기
                console.log('구독 목록의 최신동영상이어요 :' , videos);
                return videos;
            })
        );

        return channelVideos;

    } catch (e) {
        console.log(tag, "SubscriptionVideos가 데이터를 못가져와아아아아", e);
    }
}



// 채널 아이디로 체널 동영상 가져오기
const fetchChannelVideos = async (channelId , token) => {
    try {
        const {data: response} = await instance.get(requests.fetchChannelVideos(channelId), {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                part: "snippet",
                channelId: channelId,
                regionCode: "KR",
                maxResults: 10,
                type: "video"
            }
        });
        console.log("동영상을 가져오앗다",response);
        // 떨어지는 data 가공
        const videos = response.items.map((item) => ({
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

        return videos;

    } catch (e) {
        console.log(tag, `fetchChannelVideos가 ${channelId} 비디오를 못가져와아아아`, e);
        return [];
    }
}