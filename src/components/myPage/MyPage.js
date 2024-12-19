import "./MyPage.css";
import "./SortDropdown.css"
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./component/Profile";
import Record from "./component/Record";
import Playlist from "./component/Playlist";
import WatchVideos from "./component/WatchVideos";
import {extractAuthCode, fetchUserChannel, fetchUserPlaylists, fetchWatchLaterVideos, fetchLikedVideos, fetchFirstVideoId} from "../../service/MyPageService";

export default function MyPage() {
    const [playlists, setPlaylists] = React.useState([]);
    const [channelName, setChannelName] = useState("");
    const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [channelId, setChannelId] = useState("");
    const [FirstVideoId, setFirstVideoId] = useState("");
    const accessToken = localStorage.getItem("ACCESS_TOKEN"); // accessToken 공유
    console.log("Stored Access Token:", accessToken);

    // 인증 코드 추출 및 토큰 발급
    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            console.log("Access Token not found. Calling extractAuthCode...");
            extractAuthCode(); // Access Token이 없을 때만 호출
        } else {
            console.log("Access Token already exists. Skipping extractAuthCode.");
        }
    }, []);

    // 유튜브 데이터 요청
    useEffect(() => {
        const fetchData = async () => {
            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                // refreshAccessToken();
                // localStorage.removeItem("ACCESS_TOKEN");
                // localStorage.removeItem("REFRESH_TOKEN");
                // handleLogin(); // OAuth 로그인 함수 호출
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

                const watchLater = await fetchWatchLaterVideos(accessToken);
                setWatchLaterVideos(watchLater || []);

                const liked = await fetchLikedVideos(accessToken);
                setLikedVideos(liked || []);

                const firstVideo = await fetchFirstVideoId(accessToken, "WL");
                setFirstVideoId(firstVideo || "");
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
                        <Playlist likedVideos={likedVideos} channelId={channelId}/>
                        <WatchVideos watchLaterVideos={watchLaterVideos}/>
                    </div>
                </div>
            </div>
        </div>
    )
}