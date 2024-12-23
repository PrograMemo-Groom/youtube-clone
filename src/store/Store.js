import searchReducer from "./reducer/SearchReducer";
import mainReducer from "./reducer/MainReducer"

import subscribeReducer from "./reducer/SubscribeReducer";
import {configureStore} from "@reduxjs/toolkit";

export const Store = configureStore({
    reducer: {
        search: searchReducer,
        subscribe: subscribeReducer,
        videos : mainReducer,
        // 다른 페이지 여기 주입
    },
});

export default Store;