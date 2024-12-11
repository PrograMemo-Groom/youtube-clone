import React from 'react';
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div
                className={styles.sidebar_Item}
                onClick={() => navigate('/')}
            >
                <img src={`${process.env.PUBLIC_URL}/home.png`} alt="홈" className={styles.sidebar_icon}/>
                <span>홈</span>
            </div>
            <div
                className={styles.sidebar_Item}
                onClick={() => navigate('/shorts')}
            >
                <img src={`${process.env.PUBLIC_URL}/shorts.png`} alt="Shorts" className={styles.sidebar_icon}/>
                <span>Shorts</span>
            </div>
            <div
                className={styles.sidebar_Item}
                onClick={() => navigate('/subscribe')}
            >
                <img src={`${process.env.PUBLIC_URL}/subscription.png`} alt="구독" className={styles.sidebar_icon}/>
                <span>구독</span>
            </div>
            <div
                className={styles.sidebar_Item}
                onClick={() => navigate('/myPage')}
            >
                <img src={`${process.env.PUBLIC_URL}/mypage.png`} alt="내 페이지" className={styles.sidebar_icon}/>
                <span>내 페이지</span>
            </div>
        </div>
    );
};

export default Sidebar;
