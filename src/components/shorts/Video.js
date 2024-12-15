import React, { useState } from 'react'
import styles from './Video.module.css';

const Video = ({onPanelToggle}) => {
  // 구독 버튼
  const [isSubscribe, setIsSubscribe] = useState(false);

  const handleSubscribeBnt = () => {
    setIsSubscribe(!isSubscribe);
  }

  return (
    <main className={styles.videoComponents}>
      {/* 컨테이너 하나 */}
      <div className={styles.videoContainer}>
        <div className={styles.videoBox}>
          {/* 비디오 넣고 */}
          <div className={styles.infoContainer}>
            {/* 프로필박스 */}
            <div className={styles.profileBox}>
              <img src={`${process.env.PUBLIC_URL}/channels4_profile.jpg`} alt="channel_profile"/>
              <p>@viviz.official</p>
              <button 
                className={isSubscribe ? styles.subscribedBtn : styles.subscribeBnt}
                onClick={handleSubscribeBnt}>
                {isSubscribe ? "구독중" : "구독"}
              </button>
            </div>
            <div className={styles.explanBox}>
              <p>챌린지의 지배자, 챌린지의 마스터 with #캐스퍼 #Kasper #VIVIZ #비비지 #EUNHA #은하 #SINB #신비 #UMJI #엄지 #Shhhchallenge #쉿챌린지</p>
            </div>
            <div className={styles.musicBox}>
              <img src={`${process.env.PUBLIC_URL}/shortmusic.png`} alt="music_icon"/>
              <p> 쉿(Shhh) · KISS OF LIFE </p>
            </div>
          </div>
        </div>
        <aside className={styles.bntContainer}>
          <div>
            <button>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`} alt="likeBtn"/>
            </button>
            <span>12만</span>
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
            <span>781</span>
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
