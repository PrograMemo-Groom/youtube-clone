import React from 'react'
import styles from '../Panel.module.css';

const Comment = () => {
    return (
        <div>
            <section className={styles.contentsSection}>
                <p>HEY BOY IMMA GETCHA 😘💗 <a>#TWICE #트와이스 #STRATEGY</a></p>
            </section>
            <section className={styles.contentsBox}>
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
            </section>
        </div>
    )
}

export default Comment
