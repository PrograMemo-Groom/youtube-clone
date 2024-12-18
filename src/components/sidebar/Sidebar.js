import React, { useState, useEffect } from 'react';
import styles from "./Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isExpanded }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selected, setSelected] = useState({
            home: false,
            shorts: false,
            subscribe: false,
            myPage: false,
        }
    );

    useEffect(() => {
        // URL에 따라 선택 상태를 업데이트
        const currentPath = location.pathname;
        setSelected(  {
            home: currentPath === '/',
            shorts: currentPath === '/shorts',
            subscribe: currentPath === '/subscribe',
            myPage: currentPath === '/myPage',
        });
    }, [location]);

    const [isHovered, setIsHovered] = useState(false); // 스크롤바 표시 상태

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
        <div className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
             onMouseEnter={() => isExpanded && setIsHovered(true)}
             onMouseLeave={() => isExpanded && setIsHovered(false)}
        >
            {/* 기존 메뉴 */}
            {!isExpanded && (
                <div className={styles.sidebar_icons}>
                    <div className={styles.sidebar_Item} onClick={() => handleGoto('/', 'home')}>
                        {selected.home
                            ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/home_select.svg`} alt="홈" className={styles.sidebar_icon} />
                            : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/home.svg`} alt="홈" className={styles.sidebar_icon} />}
                        <span className={styles.text_home}>홈</span>
                    </div>
                    <div className={styles.sidebar_Item} onClick={() => handleGoto('/shorts', 'shorts')}>
                        {selected.shorts
                            ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/shorts_select.svg`} alt="Shorts" className={styles.sidebar_icon} />
                            : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/shorts.svg`} alt="Shorts" className={styles.sidebar_icon} />}
                        <span className={styles.text_shorts}>Shorts</span>
                    </div>
                    <div className={styles.sidebar_Item} onClick={() => handleGoto('/subscribe', 'subscribe')}>
                        {selected.subscribe
                            ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/subscribe_select.svg`} alt="구독" className={styles.sidebar_icon} />
                            : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/subscribe.svg`} alt="구독" className={styles.sidebar_icon} />}
                        <span className={styles.text_subscribe}>구독</span>
                    </div>
                    <div className={styles.sidebar_Item} onClick={() => handleGoto('/myPage', 'myPage')}>
                        {selected.myPage
                            ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/mypage_select.svg`} alt="내 페이지" className={styles.sidebar_icon} />
                            : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/mypage.svg`} alt="내 페이지" className={styles.sidebar_icon} />}
                        <span className={styles.text_mypage}>내 페이지</span>
                    </div>
                </div>
            )}

            {/* 확장된 메뉴 */}

            {isExpanded && (

                <div className={`${styles.expandedMenu} ${
                    isHovered ? styles.showScrollbar : styles.hideScrollbar
                }`}>
                    {/* 기본 메뉴*/}
                    <div className={styles.menuSection}>
                        <div className={styles.menuItem} onClick={() => handleGoto('/', 'home')}>
                            {selected.home
                                ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/home_select.svg`} alt="홈"
                                       className={styles.sidebar_icon}/>
                                : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/home.svg`} alt="홈"
                                       className={styles.sidebar_icon}/>}
                            <span className={styles.exp_home}>홈</span>
                        </div>
                        <div className={styles.menuItem} onClick={() => handleGoto('/shorts', 'shorts')}>
                            {selected.shorts
                                ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/shorts_select.svg`}
                                       alt="Shorts" className={styles.sidebar_icon}/>
                                : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/shorts.svg`} alt="Shorts"
                                       className={styles.sidebar_icon}/>}
                            <span className={styles.exp_shorts}>Shorts</span>
                        </div>
                        <div className={styles.menuItem} onClick={() => handleGoto('/subscribe', 'subscribe')}>
                            {selected.subscribe
                                ? <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/subscribe_select.svg`}
                                       alt="구독" className={styles.sidebar_icon}/>
                                : <img src={`${process.env.PUBLIC_URL}/assets/white/sidebar/subscribe.svg`} alt="구독"
                                       className={styles.sidebar_icon}/>}
                            <span className={styles.exp_subscribe}>구독</span>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* 내 페이지 섹션 */}
                    <div className={styles.menuSection}>
                        <h3 className={styles.sectionTitleMypage}
                            onClick={() => handleGoto('/myPage', 'myPage')}
                            style={{ cursor: 'pointer' }}>
                                내 페이지 &nbsp;＞ </h3>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/history.svg`} alt="시청 기록"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>시청 기록</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/playlist.svg`} alt="재생목록"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>재생목록</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/videos.svg`} alt="내 동영상"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>내 동영상</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/learning.svg`} alt="내 학습 프로그램"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>내 학습 프로그램</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/later.svg`} alt="나중에 볼 동영상"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>나중에 볼 동영상</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/liked.svg`} alt="좋아요"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>좋아요 표시한 동영상</span>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* 탐색 */}
                    <div className={styles.menuSection}>
                        <h3 className={styles.sectionTitle}>탐색</h3>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/trending.svg`} alt="인기 급상승"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>인기 급상승</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/shop.svg`} alt="쇼핑"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>쇼핑</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/music.svg`} alt="음악"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>음악</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/movie.svg`} alt="영화"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>영화</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/live.svg`} alt="실시간"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>실시간</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/game.svg`} alt="게임"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>게임</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/sport.svg`} alt="스포츠"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>스포츠</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/learning.svg`} alt="학습 프로그램"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>학습 프로그램</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/podcast.svg`} alt="팟캐스트"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>팟캐스트</span>
                        </div>
                    </div>

                    <div className={styles.divider}></div>
                    {/* YouTube 더보기 섹션 */}
                    <div className={styles.menuSection}>
                        <h3 className={styles.sectionTitle}>YouTube 더보기</h3>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/logo.svg`}
                                 alt="YouTube Premium" className={styles.icon}/>
                            <span className={styles.menuName}>YouTube Premium</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/logo.svg`} alt="YouTube 스튜디오"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>YouTube 스튜디오</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/logo.svg`} alt="YouTube Music"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>YouTube Music</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/logo.svg`} alt="YouTube Kids"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>YouTube Kids</span>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    {/* 설정 섹션 */}
                    <div className={styles.menuSection}>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/settings.svg`} alt="설정"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>설정</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/flag.svg`} alt="신고 기록"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>신고 기록</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/help.svg`} alt="고객센터"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>고객센터</span>
                        </div>
                        <div className={styles.menuItem}>
                            <img src={`${process.env.PUBLIC_URL}/assets/sidebar/feedback.svg`} alt="의견 보내기"
                                 className={styles.icon}/>
                            <span className={styles.menuName}>의견 보내기</span>
                        </div>
                    </div>

                    {/* 하단 정보 섹션 */}
                    <div className={styles.divider}></div>
                    <div className={styles.infoSection}>
                        <div className={styles.infoLinks}>
                            <span>정보</span> <span>보도자료</span> <span>저작권</span> <span>문의하기</span><br/>
                            <span>크리에이터</span> <span>광고</span> <span>개발자</span>
                        </div>
                        <div className={styles.infoLinks}>
                            <span><br/>약관</span> <span>개인정보처리방침</span> <br/>
                            <span>정책 및 안전</span> <br/>
                            <span>YouTube 작동의 원리</span> <br/>
                            <span>새로운 기능 테스트하기</span>
                        </div>

                        <div className={styles.copyright}>
                            © 2024 Google LLC, Sundar Pichai,<br/>
                            1600 Amphitheatre Parkway,<br/>
                            Mountain View CA 94043, USA,<br/>
                            0807-882-594 (무료), yt-support-solutions-kr@google.com, 호스팅: <br/>
                            Google LLC,
                            <span className={styles.blueLink}> 사업자정보, 불법촬영물 신고</span>
                        </div>

                        <p className={styles.notice}>
                            크리에이터들이 유튜브 상에 게시, 태그<br/>
                            또는 추천한 상품들은 판매자들의 약관에<br/>
                            따라 판매됩니다. 유튜브는 이러한 제품들을<br/>
                            판매하지 않으며, 그에 대한 책임을 지지<br/>
                            않습니다.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Sidebar;
