import React from 'react'
import styles from './Video.module.css';

const Video = () => {
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
          여기는 각종 버튼들
        </aside>
      </div>
    </main>
  )
}

export default Video
