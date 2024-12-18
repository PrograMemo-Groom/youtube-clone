// const [searchResult, setSearchResult] = useState([]);
// const [nextToken, setNextToken] = useState("");
// const [mouseHover, setMouseHover] = useState(null);
const initialState = {
    searchResult: [],
    nextToken: "",
    mouseHover: null
}

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return {...state, searchResult: action.payload};
        case 'SET_SEARCH_ERROR':
            return {...state, error: action.payload};
        case 'SET_NEXT_TOKEN':
            return {...state, nextToken: action.payload};
        case 'SET_NEXT_TOKEN_ERROR':
            return {...state, error: null};
        case 'SET_MOUSE_HOVER':
            return {mouseHover: action.payload};
        default:
            return state;
    }
}

export default SearchReducer;