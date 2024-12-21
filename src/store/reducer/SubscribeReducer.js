const initialState = {
    subscribeResult: [],
    nextToken: "",
    mouseHover: null
}
const SubscribeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOUSE_HOVER':
            return {...state, mouseHover: action.payload};
        default:
            return state;
    }
}
export default SubscribeReducer;