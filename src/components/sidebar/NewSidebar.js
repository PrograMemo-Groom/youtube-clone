import React from 'react';
import styles from './NewSidebar.module.css';

const NewSidebar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.menuSection}>
                <div className={styles.menuItem}>홈</div>
                <div className={styles.menuItem}>Shorts</div>
                <div className={styles.menuItem}>구독</div>
            </div>

            <div className={styles.menuSection}>
                <div className={styles.sectionTitle}>내 페이지</div>
                <div className={styles.menuItem}>시청 기록</div>
                <div className={styles.menuItem}>재생목록</div>
                <div className={styles.menuItem}>내 동영상</div>
                <div className={styles.menuItem}>좋아요 표시한 동영상</div>
            </div>

            <div className={styles.menuSection}>
                <div className={styles.sectionTitle}>탐색</div>
                <div className={styles.menuItem}>인기 급상승</div>
                <div className={styles.menuItem}>쇼핑</div>
                <div className={styles.menuItem}>음악</div>
                <div className={styles.menuItem}>영화</div>
                <div className={styles.menuItem}>스포츠</div>
                <div className={styles.menuItem}>게임</div>
                <div className={styles.menuItem}>실시간</div>
            </div>
        </div>
    );
};

export default NewSidebar;
