import {SET_CHANNEL_ID, SET_VIDEO_DATA, SWITCH_MODE} from "../actionType/DetailType";
import {fetchVideoDetails} from "../../service/detailService";

export const setIsDark = (isDark) => ({
    type: SWITCH_MODE,
    payload: !isDark
});

export const setChannelId = (channelId) => ({
    type: SET_CHANNEL_ID,
    payload: channelId
})

export const setVideoData = (videoData) => ({
    type: SET_VIDEO_DATA,
    payload: videoData
})

// 비동기 액션
export const fetchVideoDetail = (videoId) => {
    return async (dispatch, getState) => {
        try {
            const {videoData, channelId} = await fetchVideoDetails(videoId);

            // const currentVideoData = getState().detail.videoData;

            // 상태 업데이트
            dispatch(setVideoData(videoData));
            dispatch(setChannelId(channelId));

        } catch (error) {
            console.error("영상 정보를 가져오는 중 오류 발생:", error.message);
        }
    };
};