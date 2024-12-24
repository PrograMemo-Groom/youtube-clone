import searchReducer from "./reducer/SearchReducer";
import mainReducer from "./reducer/MainReducer"

import subscribeReducer from "./reducer/SubscribeReducer";
import {configureStore} from "@reduxjs/toolkit";
import detailReducer from "./reducer/detailReducer";

export const Store = configureStore({
    reducer: {
        search: searchReducer,
        subscribe: subscribeReducer,
        videos : mainReducer,
        // 다른 페이지 여기 주입
        detail: detailReducer
    },
});

export default Store;