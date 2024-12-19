import React, {useEffect, useRef, useState} from "react";
import "./RelatedVideo.css";
import formatViewerCount from "../../../utils/formatViewerCount";
import {fetchCreatorVideos} from "../../../utils/fetchCreatorVideos.js";
import useNavigation from "../../../hooks/useNavigation.js";
import DropdownMenu from "../../dropdownMenu/DropdownMenu";
import {useSelector} from "react-redux";

function RelatedVideo() {
    // const {isDark} = useContext(ThemeContext);
    const {link} = useNavigation();
    const observerRef = useRef(null); // Intersection Observer를 위한 ref
    const {isDark, channelId} = useSelector(state => state.detail);

    const [openDropdown, setOpenDropdown] = useState(null); // 더보기 메뉴
    const [video, setVideo] = useState([]); // 영상 데이터
    const [nextPageToken, setNextPageToken] = useState(""); // 다음 페이지 토큰
    const [isFetching, setIsFetching] = useState(false); // 데이터 요청 중 상태

    const fetchRelatedVideoList = async () => {
        if (isFetching) return; // 중복 요청 방지
        setIsFetching(true);

        try {
            const {videos, nextPageToken: newNextPageToken} = await fetchCreatorVideos(
                channelId,
                2,
                nextPageToken
            );

            const formatVideoData = videos.map((video) => {
                return {
                    id: video.videoId,
                    title: video.title,
                    channelName: video.channelTitle,
                    viewerCount: video.viewCount || 0,
                    uploadDate: video.uploadedAt || "",
                    videoSrc: video.thumbnail || "",
                    timestamp: video.duration,
                    videoLink: video.videoLink || "",
                };
            });

            // formatVideoData로 setVideo
            setVideo((prevVideos) => [...prevVideos, ...formatVideoData]);
            setNextPageToken(newNextPageToken || ""); // 다음 페이지 토큰 업데이트
        } catch (error) {
            console.error("Error fetching related video list:", error);
        } finally {
            setIsFetching(false); // 요청 종료
        }
    };


    useEffect(() => {
        fetchRelatedVideoList(); // 첫 번째 페이지 데이터 요청
    }, []);

    // 무한 스크롤 구현
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && nextPageToken) {
                    fetchRelatedVideoList(); // 다음 페이지 데이터 요청
                }
            },
            {threshold: 0.1} // 요소가 10% 이상 보이면 트리거
        );
        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef); // observer 연결

        return () => {
            if (currentRef) observer.unobserve(currentRef); // observer 해제
        };
    }, [nextPageToken]); // nextPageToken이 변경될 때마다 observer 설정

    const handleShowVideo = (videoId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        link(`/detail?q=${videoId}`);
    };

    const handleChannelClick = (channelId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        window.open(`https://www.youtube.com/channel/${channelId}`, "_blank");
    };

    const toggleDropdown = (videoId) => {
        setOpenDropdown((prev) => (prev === videoId ? null : videoId));
    };

    return (
        <section className={`relatedVideo-container`}>
            {video && video.length > 0 ? (
                video.map((video, index) => (
                    <div className="video-section" key={index}>
                        <div
                            onClick={(event) => handleShowVideo(video.id, event)}
                            className="video-box"
                        >
                            <img
                                src={video.videoSrc}
                                alt="썸네일"
                                className="video"
                            ></img>
                            <span className="time-stamp">{video.timestamp}</span>
                        </div>
                        <div className="video-details">
                            <div className={`video-title`}>{video.title}</div>
                            <div
                                onClick={(event) => handleChannelClick(channelId, event)}
                                className="channel-name"
                            >
                                {video.channelName}
                            </div>
                            <div className="video-info">
                                <span className="viewer-count">
                                    {formatViewerCount(video.viewerCount)} •{" "}
                                    {video.uploadDate}
                                </span>
                            </div>

                            {isDark ? (
                                <img
                                    className="more-btn"
                                    src="assets/icon/more_btn.svg"
                                    alt="영상 더보기"
                                    onClick={() => toggleDropdown(video.id)}
                                />
                            ) : (
                                <img
                                    className="more-btn"
                                    src="assets/icon/more_btn_black.svg"
                                    alt="영상 더보기"
                                    onClick={() => toggleDropdown(video.id)}
                                />
                            )}
                            {openDropdown === video.id && <DropdownMenu/>}
                        </div>
                    </div>
                ))
            ) : (
                <div>비디오가 없습니다.</div>
            )}
            <div
                ref={observerRef}
                style={{height: "1px", background: "transparent"}}
            ></div>
        </section>
    );
}

export default RelatedVideo;
