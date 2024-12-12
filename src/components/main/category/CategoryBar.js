import React, { useRef, useEffect, useState } from "react";
import styles from "./CategoryBar.module.css";

const categories = [
    { name: "전체", fetchFunction: "fetchMainVideos" },
    { name: "음악", fetchFunction: "fetchMusicData" },
    { name: "라이브", fetchFunction: "fetchLiveData" },
    { name: "믹스", fetchFunction: "fetchMixData" },
    { name: "뉴스", fetchFunction: "fetchNewsData" },
    { name: "게임", fetchFunction: "fetchGameData" },
    { name: "애니메이션", fetchFunction: "fetchAnimationData" },
    { name: "스케치 코미디", fetchFunction: "fetchComicData" },
    { name: "관광", fetchFunction: "fetchTourData" },
    { name: "랩", fetchFunction: "fetchRapData" },
    { name: "뷰티팁", fetchFunction: "fetchBeautyData" },
    { name: "요리", fetchFunction: "fetchCookData" },
    { name: "최근에 업로드된 동영상", fetchFunction: "fetchRecentlyData" },
    { name: "감상한 동영상", fetchFunction: "fetchAppreciateData" },
    { name: "새로운 맞춤 동영상", fetchFunction: "fetchCustomData" },
];

const CategoryBar = ({ onCategoryChange }) => {
    const categoryBarRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("전체");
    const [isPrevVisible, setPrevVisible] = useState(false);
    const [isNextVisible, setNextVisible] = useState(false);

    const scrollLeft = () => {
        categoryBarRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        categoryBarRef.current.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = categoryBarRef.current;
        setPrevVisible(scrollLeft > 0);
        setNextVisible(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const updateButtonVisibility = () => {
        const { scrollWidth, clientWidth } = categoryBarRef.current;
        setNextVisible(scrollWidth > clientWidth);
        setPrevVisible(false);
    };

    useEffect(() => {
        if (categoryBarRef.current) {
            updateButtonVisibility();
        }
        window.addEventListener("resize", updateButtonVisibility);

        return () => {
            window.removeEventListener("resize", updateButtonVisibility);
        };
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category.name);
        if (onCategoryChange && typeof onCategoryChange === "function") {
            onCategoryChange(category.fetchFunction);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.categoryWrapper}>
                {isPrevVisible && (
                    <div className={styles.buttonWrapper} style={{ left: "10px" }}>
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
                <div
                    className={styles.categoryBar}
                    ref={categoryBarRef}
                    onScroll={handleScroll}
                >
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryClick(category)}
                            className={`${styles.categoryButton} ${
                                activeCategory === category.name
                                    ? styles.activeCategoryButton
                                    : ""
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                {isNextVisible && (
                    <div className={styles.buttonWrapper} style={{ right: "10px" }}>
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
