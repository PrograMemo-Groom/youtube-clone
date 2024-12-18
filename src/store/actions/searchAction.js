import {SET_MOUSE_HOVER, SET_NEXT_TOKEN, SET_SEARCH} from "../actionType/SearchType";
import {fetchSearchList} from "../../service/SearchService";

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

export const fetchSearchListResults = (searchTerm, nextToken = "") => {
    return async (dispatch, getState) => {
        try {
            const {items, pageToken} = await fetchSearchList(searchTerm, nextToken);
            const currentResult = getState().search.searchResult;
            const uniqueResults = Array.from(
                new Map([...currentResult, ...items].map((item) => [item.videoId, item])).values()
            );

            dispatch(setSearchResult(uniqueResults));
            dispatch(setNextToken(pageToken || null));
        } catch (e) {
            console.error(`[SearchPage] fetchSearchResults error:`, e);
        }
    }
}