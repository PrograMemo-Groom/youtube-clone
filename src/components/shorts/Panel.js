import React from 'react'
import styles from './Panel.module.css';

const Panel = ({onPanelToggle}) => {
  return (
    <div className={styles.panelContainer}>
        <div className={styles.contentsContainer}>
          <header className={styles.contentsHeader}>
            <p>설명</p>
            <button className={styles.closeBnt}>
              <img 
                src={`${process.env.PUBLIC_URL}/closeicon.png`}
                onClick={onPanelToggle}
                alt="close"
              />
            </button>
          </header>
          <section className={styles.contentsSection}>
            <p>HEY BOY IMMA GETCHA 😘💗 <a>#TWICE #트와이스 #STRATEGY</a></p>
          </section>
          <div className={styles.contentsBox}>
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
              #TWICE #트와이스 #STRATEGY
            </section>
          </div>
        </div>
    </div>
  )
}

export default Panel
