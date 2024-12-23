import React, { useState, useEffect } from 'react';
import styles from "./Sidebar.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarItem = ({ url, itemKey, label, iconBasePath, selected, isExternal, handleClick }) => {
    const iconPath = `${iconBasePath}${itemKey}${selected ? '_select' : ''}.svg`;
    const onClick = isExternal
        ? () => window.location.href = url
        : () => handleClick(url, itemKey);

    return (
        <div className={styles.sidebar_Item} onClick={onClick}>
            <img src={iconPath} alt={label} className={styles.sidebar_icon} />
            <span className={styles[`text_${itemKey}`]}>{label}</span>
        </div>
    );
};

const SidebarSection = ({ title, items, handleClick, iconBasePath }) => (
    <div className={styles.menuSection}>
        {title && <h3 className={styles.sectionTitle}>{title}</h3>}
        {items.map((item, index) => (
            <div key={index} className={styles.menuItem} onClick={() => handleClick(item.url)}>
                <img
                    src={`${iconBasePath}${item.icon}`}
                    alt={item.label}
                    className={styles.icon}
                />
                <span className={styles.menuName}>{item.label}</span>
            </div>
        ))}
    </div>
);

const SidebarMyPageSection = ({ title, items, onTitleClick, handleClick, iconBasePath }) => (
    <div className={styles.menuSection}>
        <h3
            className={styles.sectionTitleMypage}
            onClick={onTitleClick}
            style={{ cursor: 'pointer' }}
        >
            {title} &nbsp;＞
        </h3>
        {items.map((item, index) => (
            <div key={index} className={styles.menuItem} onClick={() => handleClick(item.url)}>
                <img
                    src={`${iconBasePath}${item.icon}`}
                    alt={item.label}
                    className={styles.icon}
                />
                <span className={styles.menuName}>{item.label}</span>
            </div>
        ))}
    </div>
);

const SidebarInfoSection = ({ sections, copyright, notice }) => (
    <div className={styles.infoSection}>
        {sections.map((section, index) => (
            <div key={index} className={styles.infoLinks}>
                {section.map((item, i) => (
                    <span key={i} className={styles.infoItem}>
                        {item}
                    </span>
                ))}
            </div>
        ))}
        <div className={styles.copyright}>
            {copyright}
        </div>
        <p className={styles.notice}>{notice}</p>
    </div>
);

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
        setSelected(prevState => ({
            ...Object.fromEntries(Object.keys(prevState).map(key => [key, false])),
            [item]: true
        }));
    }

    const menuItems = [
        { url: '/', key: 'home', label: '홈' },
        { url: '/shorts', key: 'shorts', label: 'Shorts' },
        { url: '/subscribe', key: 'subscribe', label: '구독' },
        { url: '/myPage', key: 'myPage', label: '내 페이지' },
    ];

    const expanded_menuItems = [
        { url: '/', key: 'home', label: '홈' },
        { url: '/shorts', key: 'shorts', label: 'Shorts' },
        { url: '/subscribe', key: 'subscribe', label: '구독' },
    ];

    const myPageItems = [
        { url: 'https://www.youtube.com/feed/history', icon: 'history.svg', label: '시청 기록' },
        { url: 'https://www.youtube.com/feed/playlists', icon: 'playlist.svg', label: '재생목록' },
        { url: 'https://studio.youtube.com', icon: 'videos.svg', label: '내 동영상' },
        { url: 'https://www.youtube.com/feed/courses', icon: 'learning.svg', label: '내 학습 프로그램' },
        { url: 'https://www.youtube.com/playlist?list=WL', icon: 'later.svg', label: '나중에 볼 동영상' },
        { url: 'https://www.youtube.com/playlist?list=LL', icon: 'liked.svg', label: '좋아요 표시한 동영상' },
    ];

    const exploreItems = [
        { url: 'https://www.youtube.com/feed/trending', icon: 'trending.svg', label: '인기 급상승' },
        { url: 'https://www.youtube.com/channel/UCkYQyvc_i9hXEo4xic9Hh2g', icon: 'shop.svg', label: '쇼핑' },
        { url: 'https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ', icon: 'music.svg', label: '음악' },
        { url:'https://www.youtube.com/feed/storefront?bp=ogUCKAU%3D', icon: 'movie.svg', label: '영화'},
        { url: 'https://www.youtube.com/channel/UC4R8DWoMoI7CAwX8_LjQHig', icon:'live.svg', label: '실시간'},
        { url:'https://www.youtube.com/gaming', icon:'game.svg', label: '게임'},
        { url:'https://www.youtube.com/channel/UCEgdi0XIXXZ-qJOFPf4JSKw', icon:'sport.svg', label: '스포츠'},
        { url:'https://www.youtube.com/feed/courses_destination', icon:'learning.svg', label: '학습 프로그램'},
        { url:'https://www.youtube.com/podcasts', icon:'podcast.svg', label: '팟캐스트'},

    ];

    const moreItems = [
        { url: 'https://www.youtube.com/premium', icon: 'logo.svg', label: 'YouTube Premium' },
        { url: 'https://studio.youtube.com', icon: 'logo.svg', label: 'YouTube 스튜디오' },
        { url: 'https://www.youtube.com/musicpremium', icon: 'logo.svg', label: 'YouTube Music' },
        { url: 'https://www.youtubekids.com', icon: 'logo.svg', label: 'YouTube Kids' },
    ];

    const settingsItems = [
        { url: 'https://www.youtube.com/account', icon: 'settings.svg', label: '설정' },
        { url: 'https://www.youtube.com/reporthistory', icon: 'flag.svg', label: '신고 기록' },
        { url: 'https://support.google.com/youtube', icon: 'help.svg', label: '고객센터' },
        { url: 'https://support.google.com/youtube/answer/4347644', icon: 'feedback.svg', label: '의견 보내기' },
    ];

    const infoSections = [
        ["정보", "보도자료", "저작권", "문의하기"],
        ["크리에이터", "광고", "개발자"],
        ["약관", "개인정보처리방침", "정책 및 안전"],
        ["YouTube 작동의 원리", "새로운 기능 테스트하기"],
    ];

    const copyrightText = (
        <>
            © 2024 Google LLC, Sundar Pichai,
            <br />
            1600 Amphitheatre Parkway,
            <br />
            Mountain View CA 94043, USA,
            <br />
            0807-882-594 (무료), yt-support-solutions-kr@google.com,
            <br />
            호스팅: Google LLC,
            <span className={styles.blueLink}> 사업자정보, 불법촬영물 신고</span>
        </>
    );

    const noticeText =
        "크리에이터들이 유튜브 상에 게시, 태그 또는 추천한 상품들은 판매자들의 약관에 따라 판매됩니다. 유튜브는 이러한 제품들을 판매하지 않으며, 그에 대한 책임을 지지 않습니다.";

    const handleExternalLink = (url) => {
        window.location.href = url; // 외부 링크로 현재 페이지에서 이동
    };

    return (
        <div className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
             onMouseEnter={() => isExpanded && setIsHovered(true)}
             onMouseLeave={() => isExpanded && setIsHovered(false)}
        >
            {/* 기존 메뉴 */}
            {!isExpanded && (
                <div className={styles.sidebar_icons}>
                    {menuItems.map(item => (
                        <SidebarItem
                            key={item.key}
                            url={item.url}
                            itemKey={item.key}
                            label={item.label}
                            iconBasePath={`${process.env.PUBLIC_URL}/assets/white/sidebar/`}
                            selected={selected[item.key]}
                            handleClick={handleGoto}
                        />
                    ))}
                </div>
            )}

            {/* 확장된 메뉴 */}

            {isExpanded && (

                <div className={`${styles.expandedMenu} ${
                    isHovered ? styles.showScrollbar : styles.hideScrollbar
                }`}>
                    {/* 기본 메뉴*/}
                    <SidebarSection
                        items={expanded_menuItems.map((item) => ({
                            url: item.url,
                            icon: `${item.key}${selected[item.key] ? '_select' : ''}.svg`,
                            label: item.label,
                        }))}
                        handleClick={(url) => handleGoto(url)}
                        iconBasePath={`${process.env.PUBLIC_URL}/assets/white/sidebar/`}
                    />

                    <div className={styles.divider}></div>

                    {/* 내 페이지 섹션 */}
                    <SidebarMyPageSection
                        title="내 페이지"
                        items={myPageItems}
                        onTitleClick={() => handleGoto('/myPage', 'myPage')}
                        handleClick={handleExternalLink}
                        iconBasePath={`${process.env.PUBLIC_URL}/assets/sidebar/`}
                    />

                    <div className={styles.divider}></div>

                    {/* 탐색 */}
                    <SidebarSection
                        title="탐색"
                        items={exploreItems}
                        handleClick={handleExternalLink}
                        iconBasePath={`${process.env.PUBLIC_URL}/assets/sidebar/`}
                    />

                    <div className={styles.divider}></div>
                    {/* YouTube 더보기 섹션 */}
                    <SidebarSection
                        title="YouTube 더보기"
                        items={moreItems}
                        handleClick={handleExternalLink}
                        iconBasePath={`${process.env.PUBLIC_URL}/assets/sidebar/`}
                    />

                    <div className={styles.divider}></div>

                    {/* 설정 섹션 */}
                    <SidebarSection
                        title="설정"
                        items={settingsItems}
                        handleClick={handleExternalLink}
                        iconBasePath={`${process.env.PUBLIC_URL}/assets/sidebar/`}
                    />

                    <div className={styles.divider}></div>

                    {/* 하단 정보 섹션 */}
                    <SidebarInfoSection
                        sections={infoSections}
                        copyright={copyrightText}
                        notice={noticeText}
                    />
                </div>
            )}
        </div>
    );

};

export default Sidebar;
