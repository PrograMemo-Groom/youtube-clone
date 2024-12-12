import React from 'react'
import styles from './Video.module.css';

const Video = ({onPanelToggle}) => {

  return (
    <main className={styles.videoComponents}>
      {/* 컨테이너 하나 */}
      <div className={styles.videoContainer}>
        <div className={styles.videoBox}>
          {/* 비디오 넣고 */}
          <div className={styles.infoContainer}>
            {/* 프로필박스 */}
            <div className={styles.profileBox}>
              <img src={`${process.env.PUBLIC_URL}/channels4_profile.jpg`}/>
              <p>@viviz.official</p>
              <button className={styles.subscribeBnt} >구독</button>
            </div>
            <div className={styles.explanBox}>
              <p>챌린지의 지배자, 챌린지의 마스터 with #캐스퍼 #Kasper #VIVIZ #비비지 #EUNHA #은하 #SINB #신비 #UMJI #엄지 #Shhhchallenge #쉿챌린지</p>
            </div>
            <div className={styles.musicBox}>
              <img src={`${process.env.PUBLIC_URL}/shortmusic.png`}/>
              <p> 쉿(Shhh) · KISS OF LIFE </p>
            </div>
          </div>
        </div>
        <aside className={styles.bntContainer}>
          <div>
            <button>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`}/>
            </button>
            <span>12만</span>
          </div>
          <div>
            <button>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`}/>
            </button>
            <span>싫어요</span>
          </div>
          <div>
            <button>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`}/>
            </button>
            <span>781</span>
          </div>
          <div>
            <button>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`}/>
            </button>
            <span>공유</span>
          </div>
          <div>
            <button className={styles.shareBnt} onClick={onPanelToggle}>
              <img src={`${process.env.PUBLIC_URL}/likeicon.png`}/>
            </button>
          </div>
          <div className={styles.musicImg}>
            <img src={`${process.env.PUBLIC_URL}/unnamed.jpg`}/>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Video
