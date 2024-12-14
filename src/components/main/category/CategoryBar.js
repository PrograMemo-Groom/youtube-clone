import React, { useRef, useEffect, useState } from "react";
import styles from "./CategoryBar.module.css";
import {
    fetchRecentlyUploaded,
    //fetchWatchHistory,
    fetchPersonalizedVideos,
} from "./CategoryAPI";

const categories = [
    { name: "전체", fetchFunction: null }, // 전체 동영상 (null로 설정)
    { name: "음악", fetchFunction: "10" },
    { name: "뉴스", fetchFunction: "25" },
    { name: "게임", fetchFunction: "20" },
    { name: "애니메이션", fetchFunction: "1" },
    { name: "스케치 코미디", fetchFunction: "23" },
    { name: "자동차", fetchFunction: "2" },
    { name: "과학", fetchFunction: "28" },
    { name: "스포츠", fetchFunction: "17" },
    { name: "블로그", fetchFunction: "22" },
    { name: "최근에 업로드된 동영상", fetchFunction: fetchRecentlyUploaded }, // 최근 업로드 (chart: mostPopular과 관련 없음)
    //{ name: "감상한 동영상", fetchFunction: fetchWatchHistory }, // 시청 기록 (YouTube 로그인 사용자 전용)
    //{ name: "새로운 맞춤 동영상", fetchFunction: fetchPersonalizedVideos }, // 개인 맞춤 추천 (로그인 필요)
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
        console.log("Category clicked:", category.name);
        console.log("Category fetchFunction:", category.fetchFunction);

        setActiveCategory(category.name);

        if (onCategoryChange && typeof onCategoryChange === "function") {
            if (typeof category.fetchFunction === "function") {
                category
                    .fetchFunction()
                    .then((result) => {
                        onCategoryChange(result);
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error.message);
                    });
            } else {
                onCategoryChange(category.fetchFunction);
            }
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
