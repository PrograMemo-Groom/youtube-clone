const initialState = {
    creator_dropdownState: false,

    videoId: null,
    isDark: false,
    videoData: null,
    channelId: false,
    content: {
        videoSrc: "",
        title: "",
        channel: "",
        channelSubscribers: "",
        channelImgUrl: "",
        text: "",
        views: 0,
        uploadDate: "",
        like: 0,
    },
    comments: [],
    commentsNextPageToken: "",
    isFetching: false,
    subscriptions: {},
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VIDEO_ID" :
            return {
                ...state,
                videoId: action.payload,
            }
        case "SET_VIDEO_DATA" :
            return {
                ...state,
                videoData: action.payload,
            }
        case "SET_CHANNEL_ID" :
            return {
                ...state,
                channelId: action.payload,
            }
        case "SWITCH_MODE":
            return {
                ...state,
                isDark: action.payload,
            }
        case "SET_CONTENT" :
            return {
                ...state,
                content: action.payload,
            }
        case "SET_COMMENTS" :

            return {
                ...state,
                comments: action.payload,
            }
        case "SET_COMMENTS_NEXT_PAGE_TOKEN" :
            return {
                ...state,
                commentsNextPageToken: action.payload,
            }
        case "SET_IS_FETCHING" :
            return {
                ...state,
                isFetching: action.payload,
            }
        case "TOGGLE_SUBSCRIBE":
            const videoId = action.payload;
            const isSubscribed = state.subscriptions[videoId] || false; // 현재 구독 상태
            return {
                ...state,
                subscriptions: {
                    ...state.subscriptions,
                    [videoId]: !isSubscribed, // 해당 비디오의 구독 상태를 토글
                },
            };
        default:
            return state;
    }
}

export default detailReducer;