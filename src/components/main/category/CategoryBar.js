import React, { useRef, useEffect, useState } from "react";
import styles from "./CategoryBar.module.css";
import { Link } from "react-router-dom";

const categories = [
    { name: '전체', path: '/' },
    { name: '음악', path: '/music' },
    { name: '라이브', path: '/live' },
    { name: '믹스', path: '/mix' },
    { name: '뉴스', path: '/news' },
    { name: '게임', path: '/game' },
    { name: '애니메이션', path: '/animation' },
    { name: '스케치 코미디', path: '/comic' },
    { name: '관광', path: '/tour' },
    { name: '랩', path: '/rap' },
    { name: '뷰티팁', path: '/beauty' },
    { name: '요리', path: '/cook' },
    { name: '최근에 업로드된 동영상', path: '/recently' },
    { name: '감상한 동영상', path: '/appreciate' },
    { name: '새로운 맞춤 동영상', path: '/custom'},
];

const CategoryBar = () => {
    const categoryBarRef = useRef(null);
    const [isPrevVisible, setPrevVisible] = useState(false);
    const [isNextVisible, setNextVisible] = useState(false);

    const scrollLeft = () => {
        categoryBarRef.current.scrollBy({
            left: -200,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        categoryBarRef.current.scrollBy({
            left: 200,
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        const {scrollLeft, scrollWidth, clientWidth} = categoryBarRef.current;
        setPrevVisible(scrollLeft > 0);
        setNextVisible(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const updateButtonVisibility = () => {
        const {scrollWidth, clientWidth} = categoryBarRef.current;

        // 화면 크기 변화에 따른 버튼 상태 업데이트
        setNextVisible(scrollWidth > clientWidth);
        setPrevVisible(false);
    };

    useEffect(() => {
        if (categoryBarRef.current) {
            updateButtonVisibility();
        }

        window.addEventListener('resize', updateButtonVisibility);

        return () => {
            window.removeEventListener('resize', updateButtonVisibility);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.categoryWrapper}>
                {isPrevVisible && (
                    <div className={`${styles.buttonWrapper}`} style={{ left: '10px' }}>
                        <button
                            onClick={scrollLeft}
                            className={styles.prevButton}
                            aria-label="이전"
                        >
                            &lt;
                        </button>
                        <span className={styles.buttonText}>이전</span>
                    </div>
                )}
                <div className={styles.categoryBar}
                     ref={categoryBarRef}
                     onScroll={handleScroll}
                >
                    {categories.map((category, index) => (
                        <Link key={index} to={category.path} className={styles.categoryButton}>
                            {category.name}
                        </Link>
                    ))}
                </div>
                {isNextVisible && (
                    <div className={`${styles.buttonWrapper}`} style={{ right: '10px' }}>
                        <button
                            onClick={scrollRight}
                            className={styles.nextButton}
                            aria-label="다음"
                        >
                            &gt;
                        </button>
                        <span className={styles.buttonText}>다음</span>
                    </div>
                )}

            </div>
        </div>
    );
};
export default CategoryBar;