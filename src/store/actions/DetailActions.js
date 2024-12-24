import {
    SET_CHANNEL_ID,
    SET_COMMENTS,
    SET_COMMENTS_NEXT_PAGE_TOKEN,
    SET_CONTENT,
    SET_IS_FETCHING,
    SET_VIDEO_DATA,
    SET_VIDEO_ID,
    SWITCH_MODE
} from "../actionType/DetailType";
import {fetchVideoDetails} from "../../service/detailService";
import {getChannelThumbnail} from "../../utils/formatProfileImage";
import {getChannelSubscriberCount} from "../../utils/getChannelSubscriberCount";
import he from "he";
import fetchVideoComments from "../../utils/fetchVideoComments";

export const setIsDark = (isDark) => ({
    type: SWITCH_MODE, payload: !isDark
});

export const setVideoId = (videoId) => ({
    type: SET_VIDEO_ID, payload: videoId
})

export const setChannelId = (channelId) => ({
    type: SET_CHANNEL_ID, payload: channelId
})

export const setVideoData = (videoData) => ({
    type: SET_VIDEO_DATA, payload: videoData
})

export const setContent = (videoDetail) => ({
    type: SET_CONTENT, payload: videoDetail
})

export const setComments = (comments) => ({
    type: SET_COMMENTS, payload: comments
})

export const setCommentsNextPageToken = (nextPageToken) => ({
    type: SET_COMMENTS_NEXT_PAGE_TOKEN, payload: nextPageToken
})

export const setIsFetching = (isFetching) => ({
    type: SET_IS_FETCHING, payload: isFetching
})

export const setToggleSubscribe = (videoId) => ({
    type: "TOGGLE_SUBSCRIBE", payload: videoId
})


// 비동기 액션
export const fetchVideoDetail = (videoId) => {
    return async (dispatch, getState) => {
        try {
            // DetailService의 함수 호출하여 비동기 데이터 가지고 옴
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

export const fetchChannelInfo = (videoId, videoData) => {
    return async (dispatch, getState) => {
        try {
            const {snippet, statistics} = videoData;

            const channelImgUrl = await getChannelThumbnail(snippet.channelId);
            const channelSubscribers = await getChannelSubscriberCount(snippet.channelId);

            // content 업데이트
            const videoDetail = {
                videoSrc: `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`,
                title: snippet.title,
                channel: snippet.channelTitle,
                channelSubscribers: channelSubscribers || "N/A",
                channelImgUrl, // 비동기적으로 가져온 썸네일 사용
                text: he.decode(snippet.description) || "", // 텍스트가 없을 경우 빈 문자열로 설정
                views: statistics.viewCount,
                uploadDate: snippet.publishedAt,
                comments: statistics.commentCount,
                likes: statistics.likeCount,
                hate: "N/A", // hateCount API에 없음
                timestamp: new Date(snippet.publishedAt).toLocaleString(),
            };

            // console.log("fetchChannelInfo() - videoDetail:", videoDetail);

            dispatch(setContent(videoDetail));
        } catch (error) {
            console.error("영상 정보를 가져오는 중 오류 발생:", error.message);
        }

    }
}

export const fetchComments = (comments, videoData, nextPageToken, isFetching) => {
    if (isFetching) return;
    setIsFetching(true);
    setCommentsNextPageToken("");

    return async (dispatch, getState) => {
        try {
            const videoId = videoData.id;
            const {
                comments: newComments,
                nextPageToken: newNextPageToken
            } = await fetchVideoComments(videoId, "popular", nextPageToken);

            // console.log("newComments", newComments);
            const formattedComments = newComments.map((comment) => ({
                id: comment.id || Math.random(), // 댓글 아이디를 식별자로 사용
                userImg: comment.profileImage || "assets/mypage/default-profile.png",
                userName: comment.author || "Anonymous",
                date: comment.date || new Date().toISOString(),
                isEdited: comment.isEdited || false,
                text: he.decode(comment.text) || "",
                like: comment.likes || 0,
                hate: comment.hate || 0,
                reply: comment.reply || [],
            }));

            dispatch(setComments([...comments, ...formattedComments]));
            dispatch(setCommentsNextPageToken(newNextPageToken || ""));
        } catch (error) {
            console.error("댓글을 불러오는 중 오류 발생:", error);
        } finally {
            setIsFetching(false);
        }
    }
}
