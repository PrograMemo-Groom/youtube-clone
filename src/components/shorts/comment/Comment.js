import React from 'react'
import styles from '../Panel.module.css';

const Comment = () => {
    return (
        <div>
            <section className={styles.commentShowBox}>
                {/* 댓글박스 하나 */}
                <div className={styles.commentContainer}>
                    <img className={styles.userProfileImg}
                        src={`${process.env.PUBLIC_URL}/channels4_profile.jpg`}
                        alt="profileImg" />

                    <div>
                        <p className={styles.userid}>@미션임파선염l</p>
                        <p className={styles.userComment}>우리 신비 이 챌린지  하면 할수록 점점  살이 쪽쪽 빠지고 있어요..</p>
                        <div className={styles.userReactionContainer}>
                            <div className={styles.likeBox}>
                                <img src={`${process.env.PUBLIC_URL}/likeicon.png`}
                                alt="likeicon" />
                                <p>984</p>
                            </div>
                            <img src={`${process.env.PUBLIC_URL}/thumbsdown.png`} 
                            alt="thumbsdown"/>
                            <p>답글</p>
                        </div>
                    </div>
                    <img
                        className={styles.ellipsisBtn}
                        src={`${process.env.PUBLIC_URL}/ellipsis.png`}
                        alt="ellopsis" />
                </div>
            </section>
            <section className={styles.commentInputBox}>
                <img src={`${process.env.PUBLIC_URL}/channels4_profile.jpg`}
                alt="profileImg" />
                <input type="text" placeholder='댓글 추가 ...' />
            </section>
        </div>
    )
}

export default Comment
