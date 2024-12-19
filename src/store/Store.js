import searchReducer from "./reducer/SearchReducer";
import {configureStore} from "@reduxjs/toolkit";
import detailReducer from "./reducer/detailReducer";

export const Store = configureStore({
    reducer: {
        search: searchReducer,
        // 다른 페이지 여기 주입
        // main : mainReducer
        detail: detailReducer
    },
});

export default Store;
