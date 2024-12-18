import {API_KEY, API_URL} from "../config/config";

// videoId 받아서 해당 영상의 댓글 리스트를 반환
export const fetchVideoComments = async (videoId, sortBy = "latest", nextPageToken = "") => {
    const url = `${API_URL}/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&pageToken=${nextPageToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 댓글 데이터가 있으면 댓글 리스트를 반환
        if (data.items) {
            const comments = data.items.map((item) => {
                const snippet = item.snippet.topLevelComment.snippet;
                return {
                    author: snippet.authorDisplayName,
                    text: snippet.textDisplay,
                    date: snippet.publishedAt,
                    updatedAt: snippet.updatedAt, // 업데이트 시간 추가
                    isEdited: snippet.publishedAt !== snippet.updatedAt, // 수정 여부 판단
                    likes: snippet.likeCount,
                    profileImage: snippet.authorProfileImageUrl, // 프로필 이미지 추가
                };
            });

            console.log("fetchVideoComments() - comments:", comments);

            return {
                comments,
                nextPageToken: data.nextPageToken || null, // 다음 페이지 토큰 반환
            };
        } else {
            return {comments: [], nextPageToken: null}; // 댓글이 없으면 빈 배열 반환
        }
    } catch (err) {
        console.error("댓글을 불러오는 중 오류 발생:", err);
        throw new Error("댓글을 불러오는 중 오류가 발생했습니다.");
    }
};


export default fetchVideoComments;
