// action 생성자
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

/* 비동기 Action 추가 */
/* 하단 2개의 function을 통합 적용하여 Action으로 만듦 */
export const fetchSearchListResults = (searchTerm, nextToken = "") => {
    return async (dispatch, getState) => {
        // getState는 redux store 상태값을 가져오기 위해 redux thunk가 제공하는 함수
        try {
            const {items, pageToken} = await fetchSearchList(searchTerm, nextToken);
            const currentResult = getState().search.searchResult;
            // store 7번 라인 search: searchReducer, reducer 13번 라인 searchResult
            const uniqueResults = Array.from(
                new Map([...currentResult, ...items].map((item) => [item.videoId, item])).values()
            );
            // 중복 key(videoId)를 기준으로 중복 제거함

            dispatch(setSearchResult(uniqueResults));
            dispatch(setNextToken(pageToken || null)); // pageToken이 undefined/null 이면 빈 문자열로 저장
        } catch (e) {
            console.error(`[SearchPage] fetchSearchResults error:`, e);
        }
    }
}

// useEffect(() => {
//     const fetchData = async () => {
//         if (searchTerm.trim().length > 0) {
//             const {items, pageToken} = await fetchSearchList(searchTerm);
//             console.log(tag, "fetchData:", items, pageToken);
//             dispatch(setSearchResult(items || []));
//             dispatch(setNextToken(pageToken || ""));
//         }
//     }
//     fetchData();
// }, [searchTerm]);
// // console.log("dummy data",searchResult);
//
// const fetchNextPage = useCallback(async() => {
//     if (!nextToken) return;
//     try {
//         const { items, pageToken } = await fetchSearchList(searchTerm, nextToken);
//         console.log(tag, "fetchNextPage:", items, pageToken);
//         const uniqueSet = [...searchResult, ...items];
//
//         const uniqueResults = Array.from(
//             new Map(uniqueSet.map((item) => [item.videoId, item])).values()
//         );
//         setSearchResult(uniqueResults);
//         setNextToken(pageToken);
//     } catch (e) {
//         console.error("Error fetchNextPage:", e);
//     }
// }, [nextToken, searchTerm, searchResult]);