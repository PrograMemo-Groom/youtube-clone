import React from 'react'
import styles from './Panel.module.css';

const Panel = () => {
  return (
    <div className={styles.panelContainer}>
        <div className={styles.contentsContainer}>
          <header className={styles.contentsHeader}>
            <p>설명</p>
            <button className={styles.closeBnt}>
              <img 
                src={`${process.env.PUBLIC_URL}/closeicon.png`}
                alt="close"
              />
            </button>
          </header>
          <section className={styles.contentsSection}>
            <p>HEY BOY IMMA GETCHA 😘💗 #TWICE #트와이스 #STRATEGY </p>
          </section>
          <section className={styles.contentsFactoid}>
            <div>
              <p>10만</p>
              <span>좋아요 수</span>
            </div>
            <div>
              <p>1,713,185</p>
              <span>조회 수</span>
            </div>
            <div>
              <p>12월 6일</p>
              <span>2024년</span>
            </div>
          </section>
          <section className={styles.tagSection}>
            해시태그부분
          </section>
        </div>
    </div>
  )
}

export default Panel
