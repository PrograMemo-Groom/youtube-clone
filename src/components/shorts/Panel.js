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
            <p>한국과 전혀 다른 트와이스 미국 인기 반응</p>
          </section>
          <section className={styles.contentsFactoid}>
            ddd
          </section>
        </div>
    </div>
  )
}

export default Panel
