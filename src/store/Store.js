import searchReducer from "./reducer/SearchReducer";
import {configureStore} from "@reduxjs/toolkit";

// redux-toolkit을 사용하여, 구성의 편의성만 가져감 (createStore)은 권장되지 않음
export const Store = configureStore({
    reducer: {
        search: searchReducer,
        // 다른 페이지 여기 주입
        // main : mainReducer
    },
});

export default Store;
