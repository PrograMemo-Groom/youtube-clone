import React, {useRef, useEffect, useState} from 'react';
import styles from './Main.module.css';
import {fetchPopularVideos} from "../../service/VideoService";

// const tag = '[Main]';
const Main = () => {
    const [video, setVideo] = useState(null);

    const categories = [
        '전체', '음악', '라이브', '믹스', '뉴스', '게임',
        '스케치 코미디', '관광', '랩', '요리',
        '최근에 업로드된 동영상', '감상한 동영상', '새로운 맞춤 동영상'
    ];

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

    //좌우 스크롤 버튼 상태 업데이트
    const handleScroll = () => {
        const {scrollLeft, scrollWidth, clientWidth} = categoryBarRef.current;
        setPrevVisible(scrollLeft > 0);
        setNextVisible(scrollLeft + clientWidth < scrollWidth - 1);
    };


    const updateButtonVisibility = () => {
        const {scrollWidth, clientWidth} = categoryBarRef.current;

        // 화면 크기 변화에 따른 버튼 상태 업데이트
        setNextVisible(scrollWidth > clientWidth); // 스크롤 가능 여부 확인
        setPrevVisible(false); // 화면 크기 조정 시 초기화
    };

    useEffect(() => {
        if (categoryBarRef.current) {
            updateButtonVisibility(); // 초기 로드 시 버튼 상태 확인
        }

        // 인기 있는 video를 가져오는 부분
        //setVideo(fetchPopularVideos());

        // resize 이벤트 리스너 추가
        window.addEventListener('resize', updateButtonVisibility);

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
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
                        <button key={index} className={styles.categoryButton}>
                            {category}
                        </button>
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

export default Main;
