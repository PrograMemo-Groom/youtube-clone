import React, {useEffect, useState} from 'react';
import styles from "./Search.module.css";
import {useLocation} from "react-router-dom";
import {fetchSearchVideos} from "../../service/VideoService";

const tag = '[SearchPage]';
const Search = () => {
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
                const response = await fetchSearchVideos(searchTerm);
                console.log(tag, "fetchData:", response);
                setSearchResult(response.items || []);
                setNextToken(response.pageToken || "");
            }
        }
        fetchData();
    }, [searchTerm]);

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
                    // console.log(video);
                    // const thisData = new Date();
                    // console.log(today)
                    return (
                        <div className={styles.videoLists}>
                            <div className={styles.videoFrame}>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${video.videoId}?controls=0&autoplay=1&loop=1&mute=1&playlist=${video.videoId}`}
                                    title={video.title}
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-storage-access-by-user-activation"
                                    // loading="lazy"
                                />
                                <span>1:10:13</span>
                            </div>
                            <div className={styles.videoDescriptions}>
                                <h2>{video.title}</h2>
                                <p>퍼스널 Personal•조회수 1.7만회</p>
                                <div className={styles.videoChannelInfo}>
                                    <div className={styles.channelInfo}>
                                        <img src={video.defaultThumbnail.url} alt="img" />
                                        <span>{video.channelTitle}</span>
                                    </div>
                                </div>
                                <p className={styles.videoDescript}>{video.description}</p>
                            </div>
                        </div>
                    )
                })}
                비디오

            </div>
        </div>
    );
};

export default Search;
