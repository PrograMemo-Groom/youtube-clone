import React, {useEffect, useRef, useState} from "react";
import formatViewerCount from "../../../../utils/formatViewerCount";
import formatTimeDifference from "../../../../utils/formatTimeDifference";
import fetchVideoComments from "../../../../utils/fetchVideoComments";
import he from "he";

const Comments = ({video, content, setTheme, videoId}) => {
    const observerRef = useRef(null); // Intersection Observer를 위한 ref


    const [comments, setComments] = useState([]); // 초기 댓글 상태 빈 배열로 설정
    const [nextPageToken, setNextPageToken] = useState(""); // 다음 페이지 토큰
    const [isFetching, setIsFetching] = useState(false); // 요청 중 상태

    const fetchComments = async () => {
        if (isFetching) return; // 중복 요청 방지
        setIsFetching(true);

        try {
            const {
                comments: newComments,
                nextPageToken: newNextPageToken
            } = await fetchVideoComments(videoId, "popular", nextPageToken);

            console.log("newComments", newComments);

            const formattedComments = newComments.map((comment) => ({
                id: comment.id || Math.random(), // 댓글 아이디를 식별자로 사용
                userImg: comment.profileImage || "assets/mypage/default-profile.png",
                userName: comment.author || "Anonymous",
                date: comment.date || new Date().toISOString(),
                isEdited: comment.isEdited || false,
                text: he.decode(comment.text) || "",
                like: comment.likes || 0,
                hate: comment.hate || 0,
                reply: comment.reply || [],
            }));

            console.log("formattedComments", formattedComments);
            // 기존 댓글에 새 댓글 추가
            setComments((prevComments) => [...prevComments, ...formattedComments]);

            // 새로운 페이지 토큰 업데이트
            setNextPageToken(newNextPageToken || "");
        } catch (error) {
            console.error("댓글을 불러오는 중 오류 발생:", error);
        } finally {
            setIsFetching(false); // 요청 종료
        }
    };

    // 댓글 정보 업데이트 (video 변경 시)
    useEffect(() => {
        setComments([]); // 새로운 video로 댓글을 초기화
        fetchComments();
    }, [video]);

    // 무한 스크롤 구현
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextPageToken) {
                    fetchComments(); // 다음 페이지 데이터 요청
                }
            },
            {threshold: 0.1} // 요소가 10% 이상 보이면 트리거
        );
        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef); // observer 연결

        return () => {
            if (currentRef) observer.unobserve(currentRef); // observer 해제
        };
    }, [nextPageToken]); // nextPageToken이 변경될 때마다 observer 설정

    return (
        <figure className="comment-container">
            <div className="comment-header">
                <span>{formatViewerCount(content.comments)}개 </span>
                <span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
          >
            <path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path>
          </svg>
          정렬 기준
        </span>
            </div>
            <div className="input-container">
                <img src="assets/mypage/user-profile.png" alt="사용자 이미지"/>
                <input
                    style={setTheme}
                    type="text"
                    placeholder="댓글 추가..."
                ></input>
            </div>

            <div className="comment-list">
                {/* 댓글 리스트 반환 */}
                {comments.map((comment, index) => (
                    <div className="comment" key={index}>
                        <img src={comment.userImg} alt="사용자 이미지"/>
                        <div className="comment-contents">
              <span className="comment-userName">
                {comment.userName}
                  <span className="comment-date">
                  {" "}
                      {formatTimeDifference(comment.date)}
                </span>
                  {comment.isEdited && (
                      <span className="isEdited"> {"(수정됨)"} </span>
                  )}
              </span>
                            {/* HTML 태그를 받아온 그대로 렌더링*/}
                            <p
                                className="comment-text"
                                dangerouslySetInnerHTML={{__html: comment.text}}
                            ></p>
                            <div className="comment-actions">
                <span className="comment-like-count">
                  👍🏻 {formatViewerCount(comment.like)}
                </span>
                                <span className="comment-hate-count">
                  👎 {formatViewerCount(comment.hate)}
                </span>
                                <span className="comment-reply">
                  답글 {comment.reply.length}
                </span>
                            </div>
                        </div>
                        <div>
                            <img
                                className="more_btn"
                                src="assets/icon/more_btn_black.svg"
                                alt="더보기"
                            />
                        </div>
                    </div>
                ))}
                <div
                    ref={observerRef}
                    style={{height: "1px", background: "transparent"}}
                ></div>
            </div>
        </figure>
    );
};

export default Comments;
