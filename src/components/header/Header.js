import React, {useCallback, useState} from 'react';
import styles from './Header.module.css';
import useNavigation from "../../hooks/useNavigation";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const Header = () => {
    const { link } = useNavigation();
    const [search, setSearch] = useState('');
    const [auth, setAuth] = useState(() => localStorage.getItem('GOOGLE_TOKEN'));
    const googleLogin = useGoogleAuth();

    // 최초 인증 및 accessToken 만료시간 이후 재발급 받을 때 사용
    const handleLogin = async () => {
        console.log(`handleLogin: Starting Google Login...`);
        await googleLogin();
    }

    const handleOnChange = (value) => {
        setSearch(value);
    }

    const handleOnkeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    const handleSearch = useCallback(() => {
        console.log(`search:${search}`);
        link(`/search?q=${search}`);
    }, [search, link]);
    return (
        <div className={styles.header}>
            <section>
                <div className={styles.icoContainer}>
                    <img src={`${process.env.PUBLIC_URL}/assets/white/header/burger.svg`}
                         alt="menu"/>
                </div>
                <div className={styles.logo} onClick={() => link("/")}>
                    <img src={`${process.env.PUBLIC_URL}/assets/white/header/youtubeLogo.svg`} alt="youtube-logo"/>
                </div>
            </section>
            <section className={styles.section2}>
                <div className={styles.inputWrapper}>
                    <input className={styles.searchBox}
                           type="search"
                           placeholder="검색"
                           value={search}
                           onChange={(e) => handleOnChange(e.target.value)}
                           onKeyUp={handleOnkeyUp}
                    />
                    <img className={styles.searchIco} src={`${process.env.PUBLIC_URL}/assets/white/header/search.svg`}
                         alt="검색"/>
                    <img className={styles.keyboardIco} src="//www.gstatic.com/inputtools/images/tia.png"
                         name="search_query"
                         property="youtube" alt="keyboard"/>
                    <button className={styles.searchButton} onClick={() => handleSearch()}>
                        <img className={styles.icoImg} src={`${process.env.PUBLIC_URL}/assets/white/header/search.svg`}
                             alt="검색"/>
                    </button>
                </div>
                <div className={styles.icoContainer}>
                    <img src={`${process.env.PUBLIC_URL}/assets/white/header/mic.svg`} alt="마이크"/>
                </div>
            </section>
            <section className={styles.section3}>
                <div className={styles.icoContainer}>
                    <img className={styles.icoImg} src={`${process.env.PUBLIC_URL}/assets/white/header/makeVideo.svg`} alt="비디오추가"/>
                </div>
                <div className={styles.icoContainer}>
                    <img className={styles.icoImg} src={`${process.env.PUBLIC_URL}/assets/white/header/notice.svg`} alt="알림"/>
                </div>
                {auth ?
                    <div className={styles.myPageIco}>
                        <span>My</span>
                    </div>
                    :
                    <button className={styles.login} onClick={() => handleLogin()}>
                        <img src={`${process.env.PUBLIC_URL}/assets/white/header/login.svg`} alt="login"/>
                        <span >로그인</span>
                    </button>
                }
            </section>
        </div>
    );
};

export default Header;
