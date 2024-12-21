import "./MyPage.css";
import "./SortDropdown.css"
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./component/Profile";
import Record from "./component/Record";
import Playlist from "./component/Playlist";
import WatchVideos from "./component/WatchVideos";
import {
    fetchUserChannel,
    fetchUserPlaylists,
    // fetchWatchLaterVideos,
    fetchLikedVideos,
    // fetchFirstVideoId,
    fetchYouTubeData
} from "../../service/MyPageService";

export default function MyPage() {
    const [likedVideos, setLikedVideos] = useState([]);
    const [playlists, setPlaylists] = React.useState([]);
    const [channelName, setChannelName] = useState("");
    const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);
    const [channelId, setChannelId] = useState("");
    const [FirstVideoId, setFirstVideoId] = useState("");
    const [accessToken, setAccessToken] = useState(null);
    // const accessToken = localStorage.getItem("ACCESS_TOKEN"); // accessToken 공유

    // 로컬스토리지에서 Access Token 가져오기
    useEffect(() => {
        const token = localStorage.getItem("GOOGLE_TOKEN");
        if (token) {
            console.log("Access Token found in localStorage:", token);
            setAccessToken(token); // 상태에 저장
        } else {
            console.warn("Access Token not found in localStorage. Please log in.");
        }
    }, []);

    // 유튜브 데이터 요청
    useEffect(() => {
        const accessToken = localStorage.getItem("GOOGLE_TOKEN");
        const fetchData = async () => {
            if (!accessToken) {
                console.error("Access token이 존재하지 않습니다. 로그인을 하세요.");
                return;
            }

            try {
                const channelData = await fetchUserChannel(accessToken);
                if (channelData?.length > 0) {
                    setChannelId(channelData[0].id);
                    setChannelName(channelData[0].snippet.title);
                }

                const userPlaylists = await fetchUserPlaylists(accessToken);
                setPlaylists(userPlaylists || []);

                // const watchLater = await fetchWatchLaterVideos(accessToken);
                // setWatchLaterVideos(watchLater || []);

                // 좋아요한 영상 가져오기
                const liked = await fetchYouTubeData("videos", accessToken);
                setLikedVideos(liked || []);

                // const firstVideo = await fetchFirstVideoId(accessToken, "WL");
                // setFirstVideoId(firstVideo || "");
            } catch (error) {
                console.error("Error fetching YouTube data:", error.message);
            }
        };

        fetchData();
    }, [accessToken]);

    return (
        <div className="container">
            <div className="relative-layout-container">
                <div className="absolute-layout-container">
                    <div className="contents-container">
                        <Profile accessToken={accessToken}/>
                        <Record likedVideos={likedVideos}/>
                        <Playlist playlists={playlists} setPlaylists={setPlaylists} channelId={channelId}/>
                        <WatchVideos watchLaterVideos={watchLaterVideos}/>
                    </div>
                </div>
            </div>
        </div>
    )
}