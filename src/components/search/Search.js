import React, {useCallback, useEffect, useState} from 'react';
import styles from "./Search.module.css";
import {useLocation} from "react-router-dom";
import {fetchSearchList} from "../../service/SearchService";
import useNavigation from "../../hooks/useNavigation";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

const tag = '[SearchPage]';
const Search = () => {
    const { link } = useNavigation();
    const [searchResult, setSearchResult] = useState([]);
    const [nextToken, setNextToken] = useState("");
    const [mouseHover, setMouseHover] = useState(null);
    const [itemRef, ] = useState([]);

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

    const fetchNextPage = useCallback(async() => {
        if (!nextToken) return;
        try {
            const { items, pageToken } = await fetchSearchList(searchTerm, nextToken);
            console.log(tag, "fetchNextPage:", items, pageToken);
            const uniqueSet = [...searchResult, ...items];

            const uniqueResults = Array.from(
                new Map(uniqueSet.map((item) => [item.videoId, item])).values()
            );
            setSearchResult(uniqueResults);
            setNextToken(pageToken);
        } catch (e) {
            console.error("Error fetchNextPage:", e);
        }
    }, [nextToken, searchTerm, searchResult]);
    const lastItemRef = useIntersectionObserver(fetchNextPage, {root: null, threshold: 0.1});

    const handleShowVideo = useCallback((videoId) => {
        link(`/detail?q=${videoId}`)
    }, [link]);

    const handleShowChannel = useCallback((url) => {
        window.open(url, "_blank");
    }, []);

    const handleAddRefs = (refs, index) => {
        if (!itemRef.current) itemRef.current = [];
        if (refs) {
            itemRef.current[index] = refs;
            if (index === searchResult.length - 1) {
                lastItemRef.current = refs;
            }
        }
    }

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
                {searchResult && searchResult.map((video, i) => {
                    const iframeUrl = `https://www.youtube-nocookie.com/embed/${video.videoId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${video.videoId}`;

                    return (
                        <div className={styles.videoLists} key={video.videoId}
                            ref={(ref) => handleAddRefs(ref, i)}>
                            <div className={styles.videoFrame}
                                 onClick={() => handleShowVideo(video.videoId)}
                                 onMouseEnter={() => setMouseHover(video.videoId)}
                                 onMouseLeave={() => setMouseHover(null)}
                            >
                                {mouseHover === video.videoId ? (
                                    <iframe
                                        src={iframeUrl}
                                        title={video.title}
                                        allow="autoplay; encrypted-media"
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation"
                                        loading="lazy"
                                    />
                                ) : (
                                    <img
                                        alt={video.title}
                                        src={video.thumbnailImg}
                                    />
                                )}
                                <span>{video.videoTime}</span>
                            </div>
                            <div className={styles.videoDescriptions}>
                                <h2 onClick={() => handleShowVideo(video.videoId)}>{video.title}</h2>
                                <p onClick={() => handleShowVideo(video.videoId)}>{video.statistics.viewCount}•{video.videoCreated}</p>
                                <div className={styles.videoChannelInfo}>
                                    <div className={styles.channelInfo}>
                                        <img src={video.channel.channelImg} alt="img"
                                             onClick={() => handleShowChannel(video.channel.customUrl)}/>
                                        <span
                                            onClick={() => handleShowChannel(video.channel.customUrl)}>{video.channelTitle}</span>
                                    </div>
                                </div>
                                <p className={styles.videoDescript}
                                   onClick={() => handleShowVideo(video.videoId)}>{video.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Search;
