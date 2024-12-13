import React, {useCallback, useEffect, useState} from 'react';
import styles from "./Search.module.css";
import {Link, useLocation} from "react-router-dom";
import {fetchSearchList} from "../../service/SearchService";
import useNavigation from "../../hooks/useNavigation";

const tag = '[SearchPage]';
const Search = () => {
    const { link } = useNavigation();
    const [searchResult, setSearchResult] = useState([]);
    const [nextToken, setNextToken] = useState("");
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm.trim().length > 0) {
                const {items, pageToken} = await fetchSearchList(searchTerm);
                console.log(tag, "fetchData:", items, pageToken);
                setSearchResult(items || []);
                setNextToken(pageToken || "");
            }
        }
        fetchData();
    }, [searchTerm]);
    // console.log("dummy data",searchResult);

    const handleShowVideo = useCallback((videoId) => {
        link(`/detail?q=${videoId}`)
    }, [link]);

    const handleShowChannel = useCallback((url) => {
        window.open(url, "_blank");
    }, []);


    return (
        <div className={styles.container}>
            <div className={styles.categoryWrapper}>
                <div className={styles.categories}>
                    <button>전체</button>
                    <button>shorts</button>
                    <button>동영상</button>
                    <button>시청하지 않음</button>
                    <button>감상한 동영상</button>
                    <button>최근에 업로드된 동영상</button>
                    <button>라이브</button>
                    <button>채널</button>
                </div>
            </div>
            <div className={styles.videos}>
                {searchResult && searchResult.map((video) => {
                    return (
                        <div className={styles.videoLists} key={video.videoId}>
                            <div className={styles.videoFrame} onClick={() => handleShowVideo(video.videoId)}>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${video.videoId}`}
                                    title={video.title}
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation"
                                    // loading="lazy"
                                />
                                <span>{video.videoTime}</span>
                            </div>
                            <div className={styles.videoDescriptions}>
                                <h2 onClick={() => handleShowVideo(video.videoId)}>{video.title}</h2>
                                <p onClick={() => handleShowVideo(video.videoId)}>{video.statistics.viewCount}•{video.videoCreated}</p>
                                <div className={styles.videoChannelInfo}>
                                    <div className={styles.channelInfo}>
                                        <img src={video.channel.channelImg} alt="img" onClick={() => handleShowChannel(video.channel.customUrl)}/>
                                        <span onClick={() => handleShowChannel(video.channel.customUrl)}>{video.channelTitle}</span>
                                    </div>
                                </div>
                                <p className={styles.videoDescript} onClick={() => handleShowVideo(video.videoId)}>{video.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Search;
