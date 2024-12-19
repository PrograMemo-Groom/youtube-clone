import "../MyPage.css";
import React from "react";

const Playlist = () => {
    return (
        <div className="playlist-container playlist-container-margin">
            <section className="playlist-text-btn">
                <section className="playlist-sort-text">
                    <p className="playlist-text">재생 목록</p>
                    <div className="sort-dropdown-container">
                        <button
                            className="sort-button"
                            onClick={handleToggleDropdown}
                        >
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
                            onClick={() => handViewFeed(channelId)}
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