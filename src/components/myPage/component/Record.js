import "../MyPage.css";
import React, {useState} from "react";
import formatVideoTime from "../../../utils/formatVideoTime";
import formatViewerCount from "../../../utils/formatViewerCount";
import useNavigation from "../../../hooks/useNavigation";

const Record = ({likedVideos}) => {
    const [openDropdown, setOpenDropdown] = useState(null); // 현재 열려 있는 videoId를 저장
    const {link} = useNavigation();

    const handleViewAllClick = () => {
        if (!likedVideos) {
            console.log("videoId 못 찾겠다 꾀꼬리", "handleViewAllClick");
            return;
        }
        const playlistUrl = "https://www.youtube.com/playlist?list=LL";
        window.location.href = playlistUrl;
    };

    const handleShowVideo = (videoId) => {
        console.log("6: ", videoId);
        const queryParam = `?q=${videoId}`;
        const detailPageUrl = `/detail${queryParam}`;
        link(detailPageUrl);
    };

    const toggleDropdown = (videoId) => {
        if (openDropdown === videoId) {
            setOpenDropdown(null); // 이미 열려 있으면 닫기
        } else {
            setOpenDropdown(videoId); // 새로운 videoId 열기
        }
    };

    return (
        <div className="view-record-container">
            <section className="view-record-text-btn">
                <p>기록</p>
                <button className="all-video-view" onClick={handleViewAllClick}>모두 보기</button>
            </section>
            <section className="view-record-contents-container">
                <section className="video-list">
                    {likedVideos.map((video, i) => (
                        <section className="video-item"
                                 key={`${i}-${video.videoId}`}>
                            <div className="video-thumbnail-container">
                                <img className="video-thumbnail"
                                     src={video.snippet.thumbnails.medium.url}
                                     alt={video.snippet.title}
                                     onClick={() => handleShowVideo(video.id)}
                                />
                                <div className="progress-container">
                                    <section className="view-icons-container">
                                        <img className="video-view-later-icon"
                                             src="/assets/mypage/video-later-view-icon.svg"
                                             alt="video-later-view-icon"/>
                                    </section>
                                    <p className="video-later-view-text">나중에 볼 동영상</p>
                                    <section className="add-playlist-icons-container">
                                        <img className="add-playlist-icon"
                                             src="/assets/mypage/playlist-icon.svg"
                                             alt="add-playlist-icon"/>
                                    </section>
                                    <p className="add-playlist-text">현재 재생 목록에 추가</p>
                                    <section className="progress-time-container">
                                        <p className="progress-time">{formatVideoTime(video.contentDetails.duration)}</p>
                                    </section>
                                </div>
                            </div>
                            <div className="video-info-container">
                                <div className="video-title-and-toggle-container">
                                    <h3 className="video-title">{video.snippet.title}</h3>
                                    <button
                                        className="toggle_btn"
                                        onClick={() => toggleDropdown(video.id)}>
                                        <img className="ellipsis-toggle-btn"
                                             src="/ellipsis.png"
                                             alt="ellipsis-toggle-btn"/>
                                    </button>
                                    <div
                                        className={`toggle-Menu ${openDropdown === video.id ? "visible" : ""}`}>
                                        <ul>
                                            <li>
                                                <img className="menu-icons"
                                                     src="/assets/videoMore/playlist.svg"
                                                     alt="현재 재생목록에 추가"/>
                                                현재 재생 목록에 추가
                                            </li>
                                            <li>
                                                <img className="menu-icons"
                                                     src="/assets/videoMore/clock.svg"
                                                     alt="나중에 볼 동영상에 저장"/>
                                                나중에 볼 영상에 저장
                                            </li>
                                            <li>
                                                <img className="menu-icons"
                                                     src="/assets/videoMore/bookmark.svg"
                                                     alt="재생목록에 저장"/>
                                                재생 목록에 저장
                                            </li>
                                            <li>
                                                <img className="menu-icons"
                                                     src="/assets/videoMore/download.svg"
                                                     alt="오프라인 저장"/>
                                                offline 저장
                                            </li>
                                            <li>
                                                <img className="menu-icons"
                                                     src="/assets/videoMore/share.svg"
                                                     alt="공유"/>
                                                공유
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="video-channel-and-meta-container">
                                    <p className="video-channel">{video.snippet.channelTitle}</p>
                                    <p className="video-meta">
                                        {formatViewerCount(video.statistics.viewCount)} 조회수
                                        · {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </section>
                    ))}
                </section>
            </section>
        </div>
    )
}

export default Record;