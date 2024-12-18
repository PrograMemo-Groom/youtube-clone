import instance from '../api/api';
import requests from '../api/endpoint';
import formatVideoTime from '../utils/formatVideoTime';
import formatViewCount from "../utils/formatViewPeople";
import formatTimeDifference from "../utils/formatTimeDifference";


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
            channelTitle: channel.snippet.title,
            channelDescription: channel.snippet.description,
            channelAvatar: channel.snippet.thumbnails.default.url,
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

        // 아이디 넘겨서 채널 디테일 + 최신 동영상 가져오기
        const channelVideos = await Promise.all(
            items.map(async (item) => {
                const channelId = item.snippet.resourceId.channelId;
                const channelDetails = await fetchChannelDetails(channelId);
                const videos = await fetchChannelVideos(channelId, token);
                const videoDetails = await fetchVideoDetails(videos, token);

                // 채널 정보와 동영상 정보를 합치기
                const videosWithAvatar = videoDetails.map(video => ({
                    ...video,
                    channelAvatar: channelDetails.channelAvatar,
                    channelTitle: channelDetails.channelTitle,
                }));

                console.log('아바타 합쳐진 비디오 :', videosWithAvatar);

                return videosWithAvatar;
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
                part: 'snippet',
                channelId: channelId,
                regionCode: "KR",
                maxResults: 2,
                type: "video"
            }
        });

        const videoIds = response.items.map(item => item.id.videoId);
        console.log("videoIds:", videoIds);
        return videoIds; // videoId 목록 반환

    } catch (e) {
        console.log("채널 동영상을 가져오는데 오류 발생:", e);
        return [];
    }
};

// 영상 아이디로 체널 디테일 가져오기 (duration, view 포함)
const fetchVideoDetails = async (videoIds, token) => {
    try {
        const { data: response } = await instance.get(requests.fetchGetVideo, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoIds.join(',')  // 여러 개의 videoId를 ','로 구분하여 전달
            }
        });

        // 여러 동영상 정보를 배열로 반환
        return response.items.map(video => ({
            channelTitle: video.channelTitle,
            videoId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            publishTime: formatTimeDifference(video.snippet.publishedAt),
            defaultThumbnail: video.snippet.thumbnails.default.url,
            highThumbnail: video.snippet.thumbnails.high.url,
            duration: formatVideoTime(video.contentDetails.duration),
            views: formatViewCount(video.statistics.viewCount),
        }));
    } catch (e) {
        console.log("비디오 상세 정보를 가져오는데 오류 발생:", e);
        return [];
    }
};



// 쇼츠 가져오기

export const fetchShortsVideos = async (query = "shorts") => {
    try {
        // Step 1: /search 요청으로 videoId 가져오기
        const { data: { items: searchResults = [] } = {} } = await instance.get(requests.fetchGetSearch, {
            params: {
                part: "snippet",
                regionCode: "KR",
                maxResults: 6,
                q: query,
                type: "video",
            },
        });

        // videoId 목록 생성
        const videoIds = searchResults.map(item => item.id.videoId).join(",");

        if (!videoIds) return []; // videoId가 없으면 빈 배열 반환

        // Step 2: /videos 요청으로 statistics 가져오기
        const { data: { items: videoDetails = [] } = {} } = await instance.get(requests.fetchGetVideo, {
            params: {
                part: "snippet,statistics",
                id: videoIds,
            },
        });

        // 필요한 데이터 매핑
        return videoDetails.map((video) => ({
            id: video.id,
            title: video.snippet.title,
            viewerCount: formatViewCount(video.statistics?.viewCount || 0),
            thumbUrl: video.snippet.thumbnails.high.url,
        }));

    } catch (e) {
        console.error("Error fetching Shorts videos:", e.response?.data || e.message);
        return []; // 에러 발생 시 빈 배열 반환
    }
};






// 60초 이하를 숏츠로 분류 ~! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 쇼츠 섹션

/*
export const fetchSubscriptionsShorts = async (token) => {
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

        // 아이디 넘겨서 채널 디테일 + 최신 동영상 가져오기
        const channelVideos = await Promise.all(
            items.map(async (item) => {
                const channelId = item.snippet.resourceId.channelId;
                const videos = await fetchChannelShorts(channelId, token);
                const videoDetails = await fetchShortsDetails(videos, token);

                console.log('구독 쇼츠는 이것이다 :', videoDetails);

                return videoDetails;
            })
        );

        return channelVideos;

    } catch (e) {
        console.log(tag, "fetchSubscriptionsShorts가 문제래요....", e);
    }
}



// 채널 아이디로 체널 동영상 가져오기
const fetchChannelShorts = async (channelId , token) => {
    try {
        const {data: response} = await instance.get(requests.fetchChannelVideos(channelId), {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                part: 'snippet',
                channelId: channelId,
                regionCode: "KR",
                maxResults: 2,
                type: "video"
            }
        });

        const videoIds = response.items.map(item => item.id.videoId);
        console.log("videoIds:", videoIds);
        return videoIds; // videoId 목록 반환

    } catch (e) {
        console.log("채널의 쇼츠를 가져오는데 오류 발생:", e);
        return [];
    }
};

// 영상 아이디로 쇼츠 디테일 가져오기 (duration, view 포함)
const fetchShortsDetails = async (videoIds, token) => {
    try {
        const { data: response } = await instance.get(requests.fetchGetVideo, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoIds.join(',')  // 여러 개의 videoId를 ','로 구분하여 전달
            }
        });

        // 여기에 duration 60초 이하 필터링하는 코드 넣기 !!

        // 여러 동영상 정보를 배열로 반환
        return response.items.map(video => ({
            channelTitle: video.channelTitle,
            videoId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            publishTime: formatTimeDifference(video.snippet.publishedAt),
            defaultThumbnail: video.snippet.thumbnails.default.url,
            highThumbnail: video.snippet.thumbnails.high.url,
            duration: formatVideoTime(video.contentDetails.duration),
            views: formatViewCount(video.statistics.viewCount),
        }));
    } catch (e) {
        console.log("비디오 상세 정보를 가져오는데 오류 발생:", e);
        return [];
    }
};

*/