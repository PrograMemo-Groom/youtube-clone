import React from "react";
import "./MainVideo.css";

function MainVideo() {
  return (
    <section className='mainVideo-container'>
      <figure className='video-container'>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/rZ3tsvTqeZ0?si=-SH64CToqfeVyIfP&modestbranding=1&rel=0'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        ></iframe>
      </figure>

      {/* 영상 설명란 */}
      <figure className='video-details'>
        <div className='details-header'>
          풀배열 졸업은 이거다⌨️마참내 나온 독거미 풀배열 F108 개봉기
        </div>
        <div className='details-actions'>
          <div className='creator-tab'>
            <img
              src='https://yt3.ggpht.com/ytc/AIdro_mYtJzeW-vVuUHvTbF24DKaa0PEr3alb_Zh3bi3IaMBUgM=s48-c-k-c0x00ffffff-no-rj'
              alt='creator'
            />
            <div className='creator-info'>
              <span>키보드 크리에이터</span>
              <span>구독자 1.5만명</span>
            </div>
            <button className='subscribe-btn'>구독</button>
          </div>

          <div className='actions'>
            <div>
              <button className='like-btn'>👍좋아요</button>
              <button className='hate-btn'>👎</button>
            </div>
            <button className='share-btn'>⤴️공유</button>
            <button className='saveOfline-btn'>⬇️오프라인 저장</button>
            <button className='Thanks-btn'>Thanks</button>
            <button className='more-btn'>···</button>
          </div>
        </div>
        <div className='details-contents'>
          <p>조회수 15만회 1일 전</p>
          <span>
            자세한 사진은 https://bit.ly/4g5m4E5 F99 프로 촬영하고 다음날
            기습(?) 예판한 독거미 풀배열, F108을 드디어 받았습니다! 가스켓 구조,
            5중 흡음, 공장 윤활, 및 풀 RGB 등 기존 독거미 키보드의 장점은 다
            갖추고 이악물고 안 내 주던 108키 풀배열이죠. 사실 절대적으로만 보면
            가성비까지도 좋은데, 아콘 AK47 같은 거 생각하면 정식 출시 가격이 좀
            부담스럽긴 한 것 빼면 뭐 길게 설명할 필요 없이 이 정도면 완벽에
            가까운 것 같습니다. 근데... 다른 축 살걸........ㅠㅠ
          </span>
        </div>
      </figure>

      {/* 댓글 창 */}
      <figure className='comment-container'>
        <div className='comment-header'>
          <span>댓글 1,000개 </span>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              enable-background='new 0 0 24 24'
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
          <div className='comment'>
            <img src='assets/mypage/user-profile.png' alt='사용자 이미지' />

            <div className='comment-contents'>
              <span className='comment-userName'>
                @kimrora
                <span className='comment-date'> 5개월 전</span>
                <span className='isEdited'> {"(수정됨)"} </span>
              </span>
              <p className='comment-text'>
                섬네일에 홀린듯이 들어와있는 나자신 발견
              </p>
              <div className='comment-actions'>
                <span className='comment-like-count'>👍🏻 {51}</span>
                <span className='comment-hate-count'>👎</span>
                <span className='comment-reply'>답글</span>
              </div>
            
            </div>
            <div>
              <img className="more_btn" src="assets/icon/more_btn_black.svg" alt="더보기"/>
            </div>
          </div>
          <div className='comment'>
            <img src='assets/mypage/user-profile.png' alt='사용자 이미지' />

            <div className='comment-contents'>
              <span className='comment-userName'>
                @kimrora
                <span className='comment-date'> 5개월 전</span>
                <span className='isEdited'> {"(수정됨)"} </span>
              </span>
              <p className='comment-text'>
                섬네일에 홀린듯이 들어와있는 나자신 발견
              </p>
              <div className='comment-actions'>
                <span className='comment-like-count'>👍🏻 {51}</span>
                <span className='comment-hate-count'>👎</span>
                <span className='comment-reply'>답글</span>
              </div>
            
            </div>
            <div>
              <img className="more_btn" src="assets/icon/more_btn_black.svg" alt="더보기"/>
            </div>
          </div>
          <div className='comment'>
            <img src='assets/mypage/user-profile.png' alt='사용자 이미지' />

            <div className='comment-contents'>
              <span className='comment-userName'>
                @kimrora
                <span className='comment-date'> 5개월 전</span>
                <span className='isEdited'> {"(수정됨)"} </span>
              </span>
              <p className='comment-text'>
                섬네일에 홀린듯이 들어와있는 나자신 발견
              </p>
              <div className='comment-actions'>
                <span className='comment-like-count'>👍🏻 {51}</span>
                <span className='comment-hate-count'>👎</span>
                <span className='comment-reply'>답글</span>
              </div>
            
            </div>
            <div>
              <img className="more_btn" src="assets/icon/more_btn_black.svg" alt="더보기"/>
            </div>
          </div>
          
        </div>
      </figure>
    </section>
  );
}

export default MainVideo;
