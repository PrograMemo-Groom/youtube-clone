import "../MyPage.css";
import React from "react";
import {fetchAllPlaylists} from "../../../service/MyPageService"

const WatchVideos = ({watchLaterVideos}) => {
    const [playlists, setPlaylists] = React.useState([]);

    // 13개의 유효한 재생목록 가져옴
    React.useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("ACCESS_TOKEN");

            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                return;
            }

            try {
                const playlists = await fetchAllPlaylists(accessToken);

                if (playlists) {
                    setPlaylists(playlists); // 상태 업데이트
                    console.log("Filtered Playlists:", playlists);
                }
            } catch (error) {
                console.error("Error fetching playlists:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="Videos-to-watch-container Videos-to-watch-container-height">
            <section className="Videos-to-watch-text-btn">
                <section className="Videos-to-watch-later">
                    <p>나중에 볼 동영상</p>
                    <p className="watch-later-num">{watchLaterVideos.length}</p>
                </section>
                <button className="all-video-view">모두 보기</button>
            </section>
            <section className="view-record-contents-container">
                <section className="video-list">
                    {watchLaterVideos.map((video, i) => (
                        <section className="video-item"
                                 key={`${i}-${video.contentDetails.videoId}`}>
                            <div className="video-thumbnail-container">
                                <img className="video-thumbnail"
                                     src={video.snippet.thumbnails.medium.url}
                                     alt={video.snippet.title}/>
                            </div>
                            <div className="video-info-container">
                                <h3 className="video-title">{video.snippet.title}</h3>
                                <p className="video-channel">{video.snippet.channelTitle}</p>
                                <p className="video-meta">
                                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </section>
                    ))}
                </section>
            </section>
        </div>
    )
}

export default WatchVideos;