import React from 'react';
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.sidebar_Item}>
                <img src={`${process.env.PUBLIC_URL}/home.png`} alt="홈" className={styles.sidebar_icon} />
                <span>홈</span>
            </Link>
            <Link to="/shorts" className={styles.sidebar_Item}>
                <img src={`${process.env.PUBLIC_URL}/shorts.png`} alt="Shorts" className={styles.sidebar_icon} />
                <span>Shorts</span>
            </Link>
            <Link to="/subscriptions" className={styles.sidebar_Item}>
                <img src={`${process.env.PUBLIC_URL}/subscription.png`} alt="구독" className={styles.sidebar_icon} />
                <span>구독</span>
            </Link>
            <Link to="/my-page" className={styles.sidebar_Item}>
                <img src={`${process.env.PUBLIC_URL}/mypage.png`} alt="내 페이지" className={styles.sidebar_icon} />
                <span>내 페이지</span>
            </Link>
        </div>
    );
};

export default Sidebar;
