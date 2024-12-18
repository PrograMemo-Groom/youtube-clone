const initialState = {
    //creator-reserve-tab
    creator_dropdownState: false,
    isDark: false,
    videoData: null,
    channelId: false,
    isDarkStyle: null,
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

export default detailReducer;