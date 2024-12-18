import React, {useEffect, useState} from 'react';
import formatViewerCount from "../../../../utils/formatViewerCount";
import formatTimeDifference from "../../../../utils/formatTimeDifference";
import fetchVideoComments from "../../../../utils/fetchVideoComments";
import he from "he";

const Comments = ({video, content, setTheme, videoId}) => {
    const [comments, setComments] = useState([
        {
            id: 0,
            userImg: "",
            userName: "",
            date: "",
            isEdited: true,
            text: "",
            like: 0,
            hate: 0,
            reply: [{}, {}, {}],
        },
    ]);

    // 댓글 정보 업데이트
    useEffect(() => {
        const fetchComments = async () => {
            const commentList = await fetchVideoComments(videoId, "popular");

            const formattedComments = commentList.map((comment) => ({
                id: +1,
                userImg: comment.profileImage || "assets/mypage/default-profile.png",
                userName: comment.author || "Anonymous",
                date: comment.date || new Date().toISOString(),
                isEdited: comment.isEdited || false,
                text: he.decode(comment.text) || "",
                like: comment.likes || 0,
                hate: comment.hate || 0,
                reply: comment.reply || [],
            }));

            // 상태 업데이트
            setComments(formattedComments);
        };

        fetchComments();
    }, [video]);
    
    return <figure className='comment-container'>
        <div className='comment-header'>
            <span>{formatViewerCount(content.comments)}개 </span>
            <span>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                enableBackground='new 0 0 24 24'
                height='24'
                viewBox='0 0 24 24'
                width='24'
                focusable='false'
                aria-hidden='true'
            >
              <path d='M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z'></path>
            </svg>
            정렬 기준
          </span>
        </div>
        <div className='input-container'>
            <img src='assets/mypage/user-profile.png' alt='사용자 이미지'/>
            <input
                style={setTheme}
                type='text'
                placeholder='댓글 추가...'
            ></input>
        </div>

        <div className='comment-list'>
            {/* 댓글 리스트 반환 */}
            {comments.map((comment, index) => (<div className='comment' key={index}>
                <img src={comment.userImg} alt='사용자 이미지'/>

                <div className='comment-contents'>
                <span className='comment-userName'>
                  {comment.userName}
                    <span className='comment-date'>
                    {" "}
                        {formatTimeDifference(comment.date)}
                  </span>
                    {comment.isEdited && (<span className='isEdited'> {"(수정됨)"} </span>)}
                </span>
                    {/* HTML 태그를 받아온 그대로 렌더링*/}
                    <p className='comment-text' dangerouslySetInnerHTML={{__html: comment.text}}></p>
                    <div className='comment-actions'>
                  <span className='comment-like-count'>
                    👍🏻 {formatViewerCount(comment.like)}
                  </span>
                        <span className='comment-hate-count'>
                    👎 {formatViewerCount(comment.hate)}
                  </span>
                        <span className='comment-reply'>
                    답글 {comment.reply.length}
                  </span>
                    </div>
                </div>
                <div>
                    <img
                        className='more_btn'
                        src='assets/icon/more_btn_black.svg'
                        alt='더보기'
                    />
                </div>
            </div>))}
        </div>
    </figure>
};
export default Comments;