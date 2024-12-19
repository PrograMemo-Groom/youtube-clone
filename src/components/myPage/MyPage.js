import "./MyPage.css";
import "./SortDropdown.css"
import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./component/Profile";
import Record from "./component/Record";
import Playlist from "./component/Playlist";
import WatchVideos from "./component/WatchVideos";

export default function MyPage() {
    const [channelName, setChannelName] = useState("");
    const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);
    const [likedVideos, setLikedVideos] = useState([]);
    const [channelId, setChannelId] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null); // 현재 열려 있는 videoId를 저장
    const [FirstVideoId, setFirstVideoId] = useState("");
    const navigate = useNavigate();
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
                // MyPage() 외부에 있는 API 함수 호출
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

    const toggleDropdown = (videoId) => {
        if (openDropdown === videoId) {
            setOpenDropdown(null); // 이미 열려 있으면 닫기
        } else {
            setOpenDropdown(videoId); // 새로운 videoId 열기
        }
    };



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
        <div className="container">
            <div className="relative-layout-container">
                <div className="absolute-layout-container">
                    <div className="contents-container">
                        <Profile accessToken={accessToken}/>
                        <Record/>
                        <Playlist likedVideos={likedVideos} channelId={channelId}/>
                        <WatchVideos/>
                    </div>
                </div>
            </div>
        </div>
    )
}