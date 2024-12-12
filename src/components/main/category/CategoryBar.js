import React, { useRef, useEffect, useState } from "react";
import styles from "./CategoryBar.module.css";
import { Link, useLocation } from "react-router-dom";

const categories = [
    { name: "전체", path: "/" },
    { name: "음악", path: "/main/music" },
    { name: "라이브", path: "/main/live" },
    { name: "믹스", path: "/main/mix" },
    { name: "뉴스", path: "/main/news" },
    { name: "게임", path: "/main/game" },
    { name: "애니메이션", path: "/main/animation" },
    { name: "스케치 코미디", path: "/main/comic" },
    { name: "관광", path: "/main/tour" },
    { name: "랩", path: "/main/rap" },
    { name: "뷰티팁", path: "/main/beauty" },
    { name: "요리", path: "/main/cook" },
    { name: "최근에 업로드된 동영상", path: "/main/recently" },
    { name: "감상한 동영상", path: "/main/appreciate" },
    { name: "새로운 맞춤 동영상", path: "/main/custom" },
];

const CategoryBar = () => {
    const location = useLocation(); // 현재 경로 가져오기
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
                    {categories.map((category, index) => {
                        const isActive = location.pathname === category.path; // 활성화된 경로 확인
                        return (
                        <Link
                            key={index}
                            to={category.path}
                            className={`${styles.categoryButton} ${
                            isActive ? styles.activeCategoryButton : ""
                        }`}
                        >
                            {category.name}
                        </Link>
                    );
                })}
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