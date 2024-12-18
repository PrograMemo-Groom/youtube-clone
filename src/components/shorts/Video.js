import React, { useState } from 'react'
import styles from './Video.module.css';

const Video = ({short, onPanelToggle}) => {
  // 구독 버튼
  const [isSubscribe, setIsSubscribe] = useState(false);

  const handleSubscribeBnt = () => {
    setIsSubscribe(!isSubscribe);
  }

  return (
    <main className={styles.videoComponents}>
      {/* 컨테이너 하나 */}
      <div key={short.id} className={styles.videoContainer}>
        <div className={styles.videoBox}
          style={{
            backgroundImage: `url(${short.video})`,
          }}
        >
          {/* 비디오 들어가는거임 여기에 */}

          <div className={styles.infoContainer}>
            {/* 프로필박스 */}
            <div className={styles.profileBox}>
              <img src={`${process.env.PUBLIC_URL}/${short.userProfilePicture}`} alt="channel_profile"/>
              <p>{short.uploadedBy}</p>
              <button 
                className={isSubscribe ? styles.subscribedBtn : styles.subscribeBnt}
                onClick={handleSubscribeBnt}>
                {isSubscribe ? "구독중" : "구독"}
              </button>
            </div>
            <div className={styles.explanBox}>
              <p>{short.description}</p>
            </div>
            <div className={styles.musicBox}>
              <img src={`${process.env.PUBLIC_URL}/shortmusic.png`} alt="music_icon"/>
              <p>{short.music}</p>
            </div>
          </div>
        </div>
        <aside className={styles.bntContainer}>
          <div>
            <button>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`} alt="likeBtn"/>
            </button>
            <span>{short.likes}</span>
          </div>
          <div>
            <button className={styles.donlikeBnt}>
              <img src={`${process.env.PUBLIC_URL}/thumbsdown.png`} alt="donlikeBtn"/>
            </button>
            <span>싫어요</span>
          </div>
          <div>
            <button className={styles.commentBnt} 
              onClick={() => onPanelToggle("comment")}>
              <img src={`${process.env.PUBLIC_URL}/comment.png`} alt="commentBtn"/>
            </button>
            <span>{short.comments}</span>
          </div>
          <div>
            <button className={styles.shareBnt}>
              <img src={`${process.env.PUBLIC_URL}/forward.png`} alt="shareBtn"/>
            </button>
            <span>공유</span>
          </div>
          <div>
            <button className={styles.ellipsisBnt}
              onClick={() => onPanelToggle("explain")}>
              <img src={`${process.env.PUBLIC_URL}/ellipsis.png`} alt="ellipsBtn"/>
            </button>
          </div>
          <div className={styles.musicImg}>
            <img src={`${process.env.PUBLIC_URL}/unnamed.jpg`} alt="musicImg"/>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Video
