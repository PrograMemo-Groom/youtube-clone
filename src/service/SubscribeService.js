import instance from '../api/api';
import requests from '../api/endpoint';

const tag = '[Service]';
export const fetchSubscriptions = async () => {
    try {
        //구독 목록 가져오기
        const {data: {items}} = await instance.get(requests.fetchSubscriptions, {
            params: {
                part: "snippet",
                mine: "true",
                maxResults: "10"  //변경하기 !

            }
        });

        //아이디 넘겨서 체널 디테일 가져오기
        const channelDetails = await Promise.all(
            items.map(async (item) => {
                const channelId = item.snippet.resourceId.channelId;
                const videos = await fetchChannelVideos(channelId);  // 최신 동영상 가져오기
                const channel = await fetchChannelDetails(channelId); // 채널 정보 가져오기
                return { channel, videos };
            })
        );

        return channelDetails.filter(Boolean);

    } catch (e) {
        console.log(tag, "Subscriptions can't get response data", e);
    }
}

export const fetchChannelDetails = async (channelId) => {
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

// 채널 아이디로 체널 동영상 가져오기
export const fetchChannelVideos = async (channelId) => {
    try {
        const { data: { items } } = await instance.get(requests.fetchVideos, {
            params: {
                part: 'snippet,statistics',
                channelId: channelId,
                order: 'date',  // !!!!!! 최신순으로 정렬 !!!!!,, 근데 체널별로 나올듯, 확인하기
                maxResults: 10,  // 일단 10개만 가져와볼가
            }
        });
        
        // 동영상 정보 추출
        const videos = items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            views: item.statistics.viewCount,
            publishedAt: item.snippet.publishedAt,
        }));

        return videos;

    } catch (e) {
        console.log(tag, `Error fetching videos for channel ${channelId}`, e);
        return [];
    }
}