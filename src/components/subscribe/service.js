import instance from '../../api/api';
import requests from '../../api/endpoint';

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
            items.map(item => fetchChannelDetails(item.snippet.resourceId.channelId))
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
