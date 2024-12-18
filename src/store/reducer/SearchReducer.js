const initialState = {
    searchResult: [],
    nextToken: "",
    mouseHover: null
}
const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {...state, searchResult: action.payload};
        case 'SET_NEXT_TOKEN':
            return {...state, nextToken: action.payload};
        case 'SET_MOUSE_HOVER':
            return {...state, mouseHover: action.payload};
        default:
            return state;
    }
}
export default SearchReducer;