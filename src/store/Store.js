import searchReducer from "./reducer/SearchReducer";
import subscribeReducer from "./reducer/SubscribeReducer";
import {configureStore} from "@reduxjs/toolkit";

export const Store = configureStore({
    reducer: {
        search: searchReducer,
        subscribe: subscribeReducer,
        // 다른 페이지 여기 주입
        // main : mainReducer
    },
});

export default Store;
