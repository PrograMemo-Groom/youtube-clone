import "../MyPage.css";
import React, {useState} from "react";
import { fetchChannelId, fetchChannelProfileImage} from "../../../service/MyPageService"

const Profile = ({accessToken}) => {
    const [profileImage, setProfileImage] = useState("/assets/myPage/user-profile.png");

    const handleChannelView = async () => {

        if (!accessToken) {
            console.error("Access token not found. Please log in again.");
            return;
        }

        const channelId = await fetchChannelId(accessToken); // 채널 ID 가져오기

        if (channelId) {
            const channelUrl = `https://www.youtube.com/channel/${channelId}`;
            window.location.href = channelUrl; // 채널 페이지로 이동
        } else {
            console.error("Failed to fetch channel ID.");
        }
    };

    const handleLogin = () => {
        try {
            const scope = encodeURIComponent("email profile https://www.googleapis.com/auth/youtube.readonly");
            const authUrl = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

            // localStorage.removeItem("ACCESS_TOKEN");
            // localStorage.removeItem("REFRESH_TOKEN");
            // localStorage.removeItem("GOOGLE_TOKEN");

            console.log("Redirecting to Google OAuth for a new Authorization Code...");
            window.location.href = authUrl; // Google OAuth 로그인 리디렉션
        } catch (error) {
            console.log("[handleLogin error] 실패 0:", error.message);
        }
    };

    // 프로필 이미지 불러오기
    React.useEffect(() => {
        const fetchProfileImage = async () => {
            if (!accessToken) {
                console.error("Access token not found. Please log in again.");
                // refreshAccessToken();
                return;
            }

            const imageUrl = await fetchChannelProfileImage(accessToken);

            // 반환된 이미지 URL 검사
            if (imageUrl) {
                setProfileImage(imageUrl);
            } else {
                console.warn("No valid profile image found. Using default image.");
                setProfileImage("/assets/mypage/user-profile.png");
            }
        };

        fetchProfileImage();
    }, []);

    return (
        <div className="user-page-info-container">
            <img className="user-profile-img"
                 src={profileImage}
                 alt="user-profile-img"/>
            <div className="user-name-and-id-container">
                <section className="user-name-container">
                    <p className="user-name">공공</p>
                    <p className="user-channel-move"
                       onClick={handleChannelView}>
                        @o0_o0_o0 &#183; 채널 보기</p>
                </section>
                <div className="changes-container">
                    <section className="changes-id-container">
                        {/*<img className="chang-id-icon"*/}
                        {/*     src="/assets/mypage/profile-icon.svg"*/}
                        {/*     alt="user-pforile-icon"/>*/}
                        {/*<button className="changes-id-text"*/}
                        {/*        onClick={handleLogin}>계정 전환*/}
                        {/*</button>*/}
                    </section>
                    <div className="Google-id-change-container">
                        <section className="Google-id-container">
                            <img className="chang-id-icon"
                                 src="/assets/mypage/google-logo-icon.svg"
                                 alt="google-id"/>
                            <button className="changes-id-text"
                                    onClick={() => window.location.href = "https://myaccount.google.com/"}>Google
                                계정
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;