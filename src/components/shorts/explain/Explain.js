import React from 'react'
import styles from '../Panel.module.css';

const Explain= ({short}) => {
    return (
        <div >
            <section className={styles.contentsSection}>
                <p>{short.description}</p>
            </section>
            <section className={styles.contentsBox}>
                <section className={styles.contentsFactoid}>
                    <div>
                        <p>{short.likes}</p>
                        <span>좋아요 수</span>
                    </div>
                    <div>
                        <p>{short.viewCount}</p>
                        <span>조회 수</span>
                    </div>
                    <div>
                        <p>{short.uploadedDate}</p>
                        <span>2024년</span>
                    </div>
                </section>
                <section className={styles.tagSection}>
                    #나중에 해시태그만 빼서 추가 예정
                </section>
            </section>
        </div>
    )
}

export default Explain
