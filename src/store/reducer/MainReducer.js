import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMainVideos } from "../../service/MainService";

// 비디오 데이터를 비동기로 가져오는 Thunk 생성
export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async ({ categoryId, pageToken }, { rejectWithValue }) => {
        try {
            const response = await getMainVideos(categoryId, pageToken);
            return {
                videos: response.videos, // API에서 받은 비디오 데이터
                nextPageToken: response.nextPageToken, // API에서 받은 다음 페이지 토큰
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice 정의
const MainReducer = createSlice({
    name: "videos",
    initialState: {
        videoList: [], // 비디오 데이터
        nextPageToken: null,
        loading: false,
        error: null, // 에러 메시지
    },
    reducers: {}, // 필요 시 동기 액션 추가
    extraReducers: (builder) => {
        // fetchVideos 상태 처리
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                const { videos, nextPageToken } = action.payload;
                state.videoList = [...state.videoList, ...videos];
                state.nextPageToken = nextPageToken;
                state.loading = false;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default MainReducer.reducer;
