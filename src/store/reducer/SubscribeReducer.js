const initialState = {
    videos: [],
    list: [],
    shorts: [],
}
const SubscribeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SUBSCRIBE_VIDEOS':
            return {...state, videos: action.payload};
        case 'SET_SUBSCRIBE_LIST':
            return {...state, list: action.payload};
        case 'SET_SUBSCRIBE_SHORTS':
            return {...state, shorts: action.payload};
        default:
            return state;
    }
}
export default SubscribeReducer;