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
        const response = await fetchSubscriptionsVideos(token);
        const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
        const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
            return new Date(b.publishTime) - new Date(a.publishTime);
        });
        dispatch(setSubscribeVideos(sortedResponse));
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
        const response = await fetchSubscriptions(token);
        const flattenedResponse = response.flatMap(sub => sub); //이중배열을 풀어보자
        const sortedResponse = flattenedResponse.sort((a, b) => {  // 영상들만 최신순 정렬하자
        return new Date(b.publishTime) - new Date(a.publishTime);
        });
        dispatch(setSubscribeList(sortedResponse));
    }
}