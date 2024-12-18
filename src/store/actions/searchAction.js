// action 생성자
import {SET_MOUSE_HOVER, SET_NEXT_TOKEN, SET_SEARCH} from "../actionType/SearchType";

export const setSearchResult = (searchResult) => ({
    type: SET_SEARCH,
    payload: searchResult
});
export const setNextToken = (nextToken) => ({
    type: SET_NEXT_TOKEN,
    payload: nextToken
});
export const setMouseHover = (videoId) => ({
    type: SET_MOUSE_HOVER,
    payload: videoId
});