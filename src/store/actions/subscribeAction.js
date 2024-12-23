import {SET_SUBSCRIBE_VIDEOS,SET_SUBSCRIBE_LIST,SET_SUBSCRIBE_SHORTS} from "../actionType/SubscribeType";
import {fetchSubscriptions,fetchSubscriptionsVideos,fetchShortsVideos} from "../../service/SubscribeService";

export const setSubscribeVideos = (videos) => ({
    type: SET_SUBSCRIBE_VIDEOS,
    payload: videos
});

export const setSubscribeList = (list) => ({
    type: SET_SUBSCRIBE_LIST,
    payload: list
});

export const setSubscribeShorts = (shorts) => ({
    type: SET_SUBSCRIBE_SHORTS,
    payload: shorts
});


export const fetchSubscribeVideos = (token) => {
    return async (dispatch) => {
        try {
            if(!token) {
                console.log("token없다이!!발급버튼 눌러서 발급받아라이!!");
                return;
            }
            const response = await fetchSubscriptionsVideos(token);
            if (Array.isArray(response)) {
                console.log('내가 가져온 동영상들 배열성공 !!');
                const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
                const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
                    return new Date(b.publishTime) - new Date(a.publishTime);
                });
                dispatch(setSubscribeVideos(sortedResponse));
            } else {
                console.error("받아온게 배열이 아님.. 이거임:", response);
            }
        } catch (error) {
            console.log('fetchSubscribeVideos 에러 :', error);
        }
    }
}

export const fetchSubscribeShorts = () => {
    return async (dispatch) => {
        const response = await fetchShortsVideos("귀여운 강아지 쇼츠");
        dispatch(setSubscribeShorts(response));
    }
}

export const fetchSubscribeList = (token) => {
    return async (dispatch) => {
        try {
            if(!token) {
                console.log("token없다이!!발급버튼 눌러서 발급받아라이!!");
                return;
            }
            const response = await fetchSubscriptions(token);  // 구독 비디오오오
            console.log("내가 구독하는 video 갖고 왔다이!!!!! ",response);
            if (Array.isArray(response)) {
                console.log('내가 가져온 동영상들 배열성공 !!');
                const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
                const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
                    return new Date(b.publishTime) - new Date(a.publishTime);
                });
                dispatch(setSubscribeList(sortedResponse));
            } else {
                console.error("받아온게 배열이 아님.. 이거임:", response);
            }
        } catch (error) {
            console.log('fetchData 에러 :', error);
        }
    }
}