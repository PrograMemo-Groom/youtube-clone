import React from 'react';
import styles from './DropdownMenu.module.css';

const DropdownMenu = props => {
    return (
        <div className={styles.dropdownMenu}>
            <ul>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/playlist.svg`}
                        alt='현재 재생목록에 추가'
                        className={styles.menuIcon}
                    />
                    현재 재생목록에 추가
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/clock.svg`}
                        alt='나중에 볼 동영상에 저장'
                        className={styles.menuIcon}
                    />
                    나중에 볼 동영상에 저장
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/bookmark.svg`}
                        alt='재생목록에 저장'
                        className={styles.menuIcon}
                    />
                    재생목록에 저장
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/download.svg`}
                        alt='오프라인 저장'
                        className={styles.menuIcon}
                    />
                    오프라인 저장
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/share.svg`}
                        alt='공유'
                        className={styles.menuIcon}
                    />
                    공유
                </li>
                <hr className='menuDivider'/>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/wrong.svg`}
                        alt='관심 없음'
                        className={styles.menuIcon}
                    />
                    숨기기
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;