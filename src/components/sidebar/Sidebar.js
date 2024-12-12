import React, { useEffect } from 'react';
import styles from "./Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selected, setSelected] = React.useState({
            home: false,
            shorts: false,
            subscribe: false,
            myPage: false,
        }
    );

    useEffect(() => {
        // URL에 따라 선택 상태를 업데이트
        const currentPath = location.pathname;
        const newSelected = {
            home: currentPath === '/',
            shorts: currentPath === '/shorts',
            subscribe: currentPath === '/subscribe',
            myPage: currentPath === '/myPage',
        };
        setSelected(newSelected);
    }, [location]);

    const handleGoto = (url, item) => {
        navigate(url);
        setSelected({
            home: false,
            shorts: false,
            subscribe: false,
            myPage: false,
            [item]: true
        });
    }
    return (
        <div className={styles.container}>
            <div className={styles.sidebar_icons}>
            <div
                className={styles.sidebar_Item}
                onClick={() => handleGoto('/','home')}
            >
                {selected.home
                    ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/home_select.svg`} alt="홈" className={styles.sidebar_icon}/>
                    : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/home.svg`} alt="홈" className={styles.sidebar_icon}/>
                }
                <span className={styles.text_home}>홈</span>
            </div>
            <div
                className={styles.sidebar_Item}
                onClick={() => handleGoto('/shorts', 'shorts')}
            >
                {selected.shorts
                    ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/shorts_select.svg`} alt="Shorts" className={styles.sidebar_icon} />
                    : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/shorts.svg`} alt="Shorts" className={styles.sidebar_icon} />
                }
                <span className={styles.text_shorts}>Shorts</span>
            </div>
            <div
                className={styles.sidebar_Item}
                onClick={() => handleGoto('/subscribe', 'subscribe')}
            >
                {selected.subscribe
                    ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/subscribe_select.svg`} alt="구독" className={styles.sidebar_icon} />
                    : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/subscribe.svg`} alt="구독" className={styles.sidebar_icon} />
                }
                <span className={styles.text_subscribe}>구독</span>
            </div>
            <div
                className={styles.sidebar_Item}
                onClick={() => handleGoto('/myPage', 'myPage')}
            >
                {selected.myPage
                    ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/mypage_select.svg`} alt="내 페이지" className={styles.sidebar_icon} />
                    : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/mypage.svg`} alt="내 페이지" className={styles.sidebar_icon} />
                }
                <span className={styles.text_mypage}>내 페이지</span>
            </div>
        </div>
        </div>
    );
};

export default Sidebar;
