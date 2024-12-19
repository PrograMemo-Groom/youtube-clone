import "../MyPage.css";
import React, {useState} from "react";
import useNavigation from "../../../hooks/useNavigation";

const Playlist = ({likedVideos}) => {
    const [playlists, setPlaylists] = React.useState([]);
    const [selectedOption, setSelectedOption] = useState("가나다순");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const {link} = useNavigation();
    // 드롭다운 토글 핸들러
    const handleToggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    // 정렬 옵션 선택 핸들러
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false); // 선택 후 드롭다운 닫기

        if (option === "가나다순") {
            const sortedPlaylists = [...playlists].sort((a, b) =>
                a.snippet.title.localeCompare(b.snippet.title)
            );
            setPlaylists(sortedPlaylists);
        } else if (option === "최신순") {
            const sortedPlaylists = [...playlists].sort((a, b) =>
                new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
            );
            setPlaylists(sortedPlaylists);
        }
        console.log(`Selected sorting option: ${option}`);
    };

    const handViewFeed = (channelId) => {
        if (!channelId) {
            console.log("channelId 못 찾겠다 꾀꼬리", "handViewPlayList");
            return;
        }
        const FeedUrl = `https://www.youtube.com/feed/playlists?channelId=${channelId}`;
        window.location.href = FeedUrl;
    }

    const navigateToPlaylist = async (playlistId, accessToken) => {
        const baseUrl = 'https://www.youtube.com/watch';

        if (!playlistId) {
            console.error("First video ID is missing.");
            return;
        }
        const url = `${baseUrl}?v=${playlistId}&list=${playlistId}`;
        window.location.href = url;
    };

    const handleShowVideo = (videoId) => {
        console.log("6: ", videoId);
        const queryParam = `?q=${videoId}`;
        const detailPageUrl = `/detail${queryParam}`;
        link(detailPageUrl);
    };

    return (
        <div className="playlist-container playlist-container-margin">
            <section className="playlist-text-btn">
                <section className="playlist-sort-text">
                    <p className="playlist-text">재생 목록</p>
                    <div className="sort-dropdown-container">
                        <button
                            className="sort-button"
                            onClick={handleToggleDropdown}>
                            {selectedOption} &#9660;
                        </button>
                        {isDropdownVisible && (
                            <div className="dropdown-menu">
                                <p className="dropdown-item"
                                   onClick={() => handleSelectOption("가나다순")}>가나다순</p>
                                <p className="dropdown-item"
                                   onClick={() => handleSelectOption("최신순")}>최신순</p>
                            </div>
                        )}
                    </div>
                </section>
                <section className="playlist-all-and-plus-btn">
                    <button className="playlist-all-view"
                            onClick={handViewFeed}
                    >모두 보기
                    </button>
                </section>
            </section>
            <section className="playlist-contents-container">
                <section className="playlist-list">
                    {playlists.map((playlist, i) => (
                        <section className="playlist-video-item"
                                 key={`${i}-${playlist.id}`}>
                            <div className="playlist-video-thumbnail-container">
                                <div className="hover-overlay">
                                    <img
                                        className="playlist-video-thumbnail"
                                        src={playlist.snippet.thumbnails.medium.url}
                                        alt={playlist.snippet.title}/>
                                    <div className="hover-text"
                                         onClick={() => navigateToPlaylist(playlist.id, playlist.firstVideoId)}>
                                        ▶ 모두 재생
                                    </div>
                                </div>
                            </div>
                            <div className="playlist-video-info-container"
                                 key={playlist.id}
                                 onClick={() => navigateToPlaylist(playlist.id, playlist.firstVideoId)}>
                                <h3 className="playlist-video-title">{playlist.snippet.title}</h3>
                                <p className="playlist-video-channel">{playlist.snippet.channelTitle} &#183; 재생
                                    목록</p>
                                <p className="playlist-video-meta">
                                    {playlist.contentDetails.itemCount} 개의 동영상
                                </p>
                            </div>
                        </section>
                    ))}
                </section>
            </section>
        </div>
    )
}

export default Playlist;