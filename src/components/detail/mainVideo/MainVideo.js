import React, {useContext, useEffect, useState} from "react";
import he from "he";
import formatViewerCount from "../../../utils/formatViewerCount";
import formatTimeDifference from "../../../utils/formatTimeDifference";
import {ThemeContext} from "../../context/context.js";
import {
    getStyle,
    getMenuItemStyle,
} from "../../detail/themes/useThemeStyles.js";
import "./MainVideo.css";
import {getChannelThumbnail} from "../../../utils/formatProfileImage.js";
import {getChannelSubscriberCount} from "../../../utils/getChannelSubscriberCount.js";
import {fetchVideoComments} from "../../../utils/fetchVideoComments.js";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";
import VideoPlayer from "./videoPlayer/VideoPlayer";
import VideoDetail from "./videoDetail/VideoDetail";

function MainVideo({video, channelId}) {
    const {isDark} = useContext(ThemeContext);
    const setMenuTheme = getMenuItemStyle(isDark);
    const setTheme = getStyle(isDark);


    const [content, setContent] = useState({
        videoSrc: "",
        title: "",
        channel: "",
        channelSubscribers: "",
        channelImgUrl: "",
        text: "",
        views: 0,
        uploadDate: "",
        like: 0,
    });
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

    const videoId = video.id;

    // 비디오 정보 업데이트
    useEffect(() => {
        const {snippet, statistics} = video;

        const fetchChannelInfo = async () => {
            // 비동기적으로 채널 썸네일 가져오기
            const channelImgUrl = await getChannelThumbnail(snippet.channelId);
            // 비동기적으로 구독자수 가져오기
            const channelSubscribers = await getChannelSubscriberCount(
                snippet.channelId
            );

            // content 업데이트
            const videoDetail = {
                videoSrc: `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`,
                title: snippet.title,
                channel: snippet.channelTitle,
                channelSubscribers: channelSubscribers || "N/A",
                channelImgUrl, // 비동기적으로 가져온 썸네일 사용
                text: he.decode(snippet.description) || "", // 텍스트가 없을 경우 빈 문자열로 설정
                views: statistics.viewCount,
                uploadDate: snippet.publishedAt,
                comments: statistics.commentCount,
                likes: statistics.likeCount,
                hate: "N/A", // hateCount API에 없음
                timestamp: new Date(snippet.publishedAt).toLocaleString(),
            };

            setContent(videoDetail);
        };

        fetchChannelInfo();
    }, [video]);

    // 댓글 정보 업데이트
    useEffect(() => {
        const fetchComments = async () => {
            const commentList = await fetchVideoComments(videoId, "popular");
            // console.log(commentList);

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


    return (
        <section className='mainVideo-container'>
            <VideoPlayer content={content}/>
            <VideoDetail content={content} channelId={channelId} setMenuTheme={setMenuTheme}
                         video={video} videoId={videoId}/>


            {/* 댓글 창 */}
            <figure className='comment-container'>
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
                    {comments.map((comment, index) => (
                        <div className='comment' key={index}>
                            <img src={comment.userImg} alt='사용자 이미지'/>

                            <div className='comment-contents'>
                <span className='comment-userName'>
                  {comment.userName}
                    <span className='comment-date'>
                    {" "}
                        {formatTimeDifference(comment.date)}
                  </span>
                    {comment.isEdited && (
                        <span className='isEdited'> {"(수정됨)"} </span>
                    )}
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
                        </div>
                    ))}
                </div>
            </figure>
        </section>
    );
}

export default MainVideo;
