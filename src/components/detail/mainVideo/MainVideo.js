import React, { useState } from "react";
import formatViewerCount from "../../../utils/formatViewerCount";
import formatTimeDifference from "../../../utils/formatTimeDifference";
import "./MainVideo.css";

function MainVideo() {
  const [content, setContent] = useState({
    videoSrc:
      "https://www.youtube.com/embed/rZ3tsvTqeZ0?si=-SH64CToqfeVyIfP&modestbranding=1&rel=0",
    title: "풀배열 졸업은 이거다⌨️마참내 나온 독거미 풀배열 F108 개봉기",
    channel: "키보드 크리에이터",
    channelSubscribers: "300000",
    channelImgUrl: 'https://yt3.ggpht.com/ytc/AIdro_mYtJzeW-vVuUHvTbF24DKaa0PEr3alb_Zh3bi3IaMBUgM=s48-c-k-c0x00ffffff-no-rj', // 채널 프로필 이미지
    text: `자세한 사진은 https://bit.ly/4g5m4E5 F99 프로 촬영하고 다음날
          기습(?) 예판한 독거미 풀배열, F108을 드디어 받았습니다! 가스켓 구조,
          5중 흡음, 공장 윤활, 및 풀 RGB 등 기존 독거미 키보드의 장점은 다
          갖추고 이악물고 안 내 주던 108키 풀배열이죠. 사실 절대적으로만 보면
          가성비까지도 좋은데, 아콘 AK47 같은 거 생각하면 정식 출시 가격이 좀
          부담스럽긴 한 것 빼면 뭐 길게 설명할 필요 없이 이 정도면 완벽에
          가까운 것 같습니다. 근데... 다른 축 살걸........ㅠㅠ`,
    views: "15000",
    uploadDate: "2022.09.01",
    comments: "1000",
    likes: "2000",
    hate: "500",
    timestamp: "2022.09.01 14:00",  
  });

  const [comments, setComments] = useState([{
    id: Date.now(),
    userImg: "assets/mypage/user-profile.png",
    userName: "kimrora",
    date: "2023-12-01",
    isEdited: true,
    text: "섬네일에 홀린듯이 들어와있는 나자신 발견",
    like: 51111111,
    hate: 3000,
    reply: [{},{},{}]
  }]);
  return (
    <section className='mainVideo-container'>
      <figure className='video-container'>
        <iframe
          width='560'
          height='315'
          src={content.videoSrc}
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
            <button className='subscribe-btn'>구독</button>
          </div>

          <div className='actions'>
            <div>
              <button className='like-btn'>👍좋아요 {formatViewerCount(content.likes)}</button>
              <button className='hate-btn'>👎 {formatViewerCount(content.hate)} </button>
            </div>
            <button className='share-btn'>⤴️ 공유</button>
            <button className='saveOfline-btn'>⬇️ 오프라인 저장</button>
            <button className='Thanks-btn'> Thanks</button>
            <button className='more-btn'>···</button>
          </div>
        </div>
        <div className='details-contents'>
          <p>조회수 {formatViewerCount(content.views)}회 {formatTimeDifference(content.uploadDate)}</p>
          <span>
            {content.text}
          </span>
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
          <input type='text' placeholder='댓글 추가...'></input>
        </div>

        <div className='comment-list'>
          {/* 댓글 리스트 반환 */}
          {comments.map((comment) => (
            <div className='comment' key={comment.id}> 
            <img src={comment.userImg} alt='사용자 이미지' />

            <div className='comment-contents'>
              <span className='comment-userName'>
                {comment.userName}
                <span className='comment-date'> {formatTimeDifference(comment.date)}</span>
                <span className='isEdited'> {"(수정됨)"} </span>
              </span>
              <p className='comment-text'>
                {comment.text}
              </p>
              <div className='comment-actions'>
                <span className='comment-like-count'>👍🏻 {formatViewerCount(comment.like)}</span>
                <span className='comment-hate-count'>👎 {formatViewerCount(comment.hate)}</span>
                <span className='comment-reply'>답글 {comment.reply.length}</span>
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
