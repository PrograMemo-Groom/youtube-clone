import searchReducer from "./reducer/SearchReducer";
import mainReducer from "./reducer/MainReducer"
import {configureStore} from "@reduxjs/toolkit";

export const Store = configureStore({
    reducer: {
        search: searchReducer,
        // 다른 페이지 여기 주입
        videos : mainReducer,
    },
});

export default Store;
