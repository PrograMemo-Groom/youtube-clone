import "./MyPage.css";
import "./SortDropdown.css"
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useNavigation from "../../hooks/useNavigation";
import Profile from "./component/Profile";
import Record from "./component/Record";
import Playlist from "./component/Playlist";
import WatchVideos from "./component/WatchVideos";

export default function MyPage() {
    const [playlists, setPlaylists] = React.useState([]);
    const [channelName, setChannelName] = useState("");
    const [isToggleVisible, setToggleVisible] = React.useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("가나다순");
    const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);

    const [likedVideos, setLikedVideos] = useState([]);
    const [channelId, setChannelId] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null); // 현재 열려 있는 videoId를 저장
    const [FirstVideoId, setFirstVideoId] = useState("");
    const navigate = useNavigate();
    const {link} = useNavigation();
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

    // if (!accessToken) {
    //     console.error("Access token is missing. Redirecting to login...");
    //     handleLogin(); // OAuth 로그인 함수 호출
    //     return;
    // }

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

    const handleShowVideo = (videoId) => {
        console.log("6: ", videoId);
        const queryParam = `?q=${videoId}`;
        const detailPageUrl = `/detail${queryParam}`;
        link(detailPageUrl);
    };

    const handleViewAllClick = () => {
        if (!likedVideos) {
            console.log("videoId 못 찾겠다 꾀꼬리", "handleViewAllClick");
            return;
        }
        const playlistUrl = "https://www.youtube.com/playlist?list=LL";
        window.location.href = playlistUrl;
    };

    const handViewFeed = (channelId) => {
        if (!channelId) {
            console.log("channelId 못 찾겠다 꾀꼬리", "handViewPlayList");
            return;
        }
        const FeedUrl = `https://www.youtube.com/feed/playlists?channelId=${channelId}`;
        window.location.href = FeedUrl;
    }

    const toggleDropdown = (videoId) => {
        if (openDropdown === videoId) {
            setOpenDropdown(null); // 이미 열려 있으면 닫기
        } else {
            setOpenDropdown(videoId); // 새로운 videoId 열기
        }
    };

    const navigateToPlaylist = async (playlistId, accessToken) => {
        const baseUrl = 'https://www.youtube.com/watch';

        if (!playlistId) {
            console.error("First video ID is missing.");
            return;
        }
        const url = `${baseUrl}?v=${playlistId}&list=${playlistId}`;
        window.location.href = url;
    };

    // 13개의 유효한 재생목록 가져옴
    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         const accessToken = localStorage.getItem("ACCESS_TOKEN");
    //
    //         if (!accessToken) {
    //             console.error("Access token not found. Please log in again.");
    //             return;
    //         }
    //
    //         try {
    //             const playlists = await fetchAllPlaylists(accessToken);
    //
    //             if (playlists) {
    //                 setPlaylists(playlists); // 상태 업데이트
    //                 console.log("Filtered Playlists:", playlists);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching playlists:", error.message);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    return (
        <div className="container">
            <div className="relative-layout-container">
                <div className="absolute-layout-container">
                    <div className="contents-container">
                        <Profile accessToken={accessToken}/>
                        <Record/>
                        <Playlist/>
                        <WatchVideos/>
                    </div>
                </div>
            </div>
        </div>
    )
}