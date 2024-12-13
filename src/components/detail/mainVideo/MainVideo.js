import React, { useContext, useEffect, useState } from "react";
import formatViewerCount from "../../../utils/formatViewerCount";
import formatTimeDifference from "../../../utils/formatTimeDifference";
import { ThemeContext } from "../../context/context.js";
import {
  getStyle,
  getMenuItemStyle,
} from "../../detail/themes/useThemeStyles.js";
import "./MainVideo.css";
import { getChannelThumbnail } from "../../../utils/formatProfileImage.js";
import { getChannelSubscriberCount } from "../../../utils/getChannelSubscriberCount.js";

function MainVideo({ video }) {
  const { isDark } = useContext(ThemeContext);
  const setMenuTheme = getMenuItemStyle(isDark);
  const setTheme = getStyle(isDark);

  const [content, setContent] = useState({});
  const [comments, setComments] = useState([
    {
      id: Date.now(),
      userImg: "assets/mypage/user-profile.png",
      userName: "kimrora",
      date: "2023-12-01",
      isEdited: true,
      text: "섬네일에 홀린듯이 들어와있는 나자신 발견",
      like: 51111111,
      hate: 3000,
      reply: [{}, {}, {}],
    },
  ]);

  useEffect(() => {
    const { snippet, statistics } = video;

    // video id 설정
    const videoId = video.id;

    const fetchChannelInfo = async () => {
      // 비동기적으로 채널 썸네일 가져오기
      const channelImgUrl = await getChannelThumbnail(snippet.channelId);
      // 비동기적으로 구독자수 가져오기
      const channelSubscribers = await getChannelSubscriberCount(snippet.channelId);

      // content 업데이트
      const videoDetail = {
        videoSrc: `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`,
        title: snippet.title,
        channel: snippet.channelTitle,
        channelSubscribers: channelSubscribers || "N/A",
        channelImgUrl, // 비동기적으로 가져온 썸네일 사용
        text: snippet.description,
        views: statistics.viewCount,
        uploadDate: snippet.publishedAt,
        comments: statistics.commentCount,
        likes: statistics.likeCount,
        hate: "N/A", // hateCount API에 없음
        timestamp: new Date(snippet.publishedAt).toLocaleString(),
      };

      setContent(videoDetail);
    };

    fetchChannelInfo(); // 썸네일을 비동기적으로 가져온 후, 업데이트
  }, [video]); // video 변경 시 업데이트

  console.log("video", video);
  return (
    <section className='mainVideo-container'>
      <figure className='video-container'>
        <iframe
          width='560'
          height='315'
          src={`https://www.youtube.com/embed/uHJDposrTMw`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </figure>

      {/* 영상 설명란 */}
      <figure className='video-details'>
        <div className='details-header'>{content.title}</div>
        <div className='details-actions'>
          <div className='creator-tab'>
            <img src={content.channelImgUrl} alt='creator' />
            <div className='creator-info'>
              <span>{content.channel}</span>
              <span>
                구독자 {formatViewerCount(content.channelSubscribers)}명
              </span>
            </div>
            <button style={setMenuTheme} className='subscribe-btn'>
              구독
            </button>
          </div>

          <div className='actions'>
            <div>
              <button style={setMenuTheme} className='like-btn'>
                👍좋아요 {formatViewerCount(content.likes)}
              </button>
              <button style={setMenuTheme} className='hate-btn'>
                👎 {formatViewerCount(content.hate)}{" "}
              </button>
            </div>
            <button style={setMenuTheme} className='share-btn'>
              ⤴️ 공유
            </button>
            <button style={setMenuTheme} className='saveOfline-btn'>
              ⬇️ 오프라인 저장
            </button>
            <button style={setMenuTheme} className='Thanks-btn'>
              {" "}
              Thanks
            </button>
            <button style={setMenuTheme} className='more-btn'>
              ···
            </button>
          </div>
        </div>
        <div style={setMenuTheme} className='details-contents'>
          <p>
            조회수 {formatViewerCount(content.views)}회{" "}
            {formatTimeDifference(content.uploadDate)}
          </p>
          <span>{content.text}</span>
        </div>
      </figure>

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
          <img src='assets/mypage/user-profile.png' alt='사용자 이미지' />
          <input
            style={setTheme}
            type='text'
            placeholder='댓글 추가...'
          ></input>
        </div>

        <div className='comment-list'>
          {/* 댓글 리스트 반환 */}
          {comments.map((comment) => (
            <div className='comment' key={comment.id}>
              <img src={comment.userImg} alt='사용자 이미지' />

              <div className='comment-contents'>
                <span className='comment-userName'>
                  {comment.userName}
                  <span className='comment-date'>
                    {" "}
                    {formatTimeDifference(comment.date)}
                  </span>
                  <span className='isEdited'> {"(수정됨)"} </span>
                </span>
                <p className='comment-text'>{comment.text}</p>
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
