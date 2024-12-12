import React from 'react'
import styles from './Panel.module.css';

const Panel = () => {
  return (
    <div className={styles.panelContainer}>
        <div className={styles.contents_container}>
          <header className={styles.contents_header}>
            <p>설명</p>
            <button>X</button>
          </header>
          <section className={styles.contents_section}>
            <p>한국과 전혀 다른 트와이스 미국 인기 반응</p>
          </section>
          <section className={styles.contents_factoid}>
            ddd
          </section>
        </div>
    </div>
  )
}

export default Panel
