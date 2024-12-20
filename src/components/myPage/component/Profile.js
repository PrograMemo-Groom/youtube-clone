import "../MyPage.css";
import React, {useEffect, useState} from "react";
import { fetchChannelId } from "../../../service/MyPageService"
import axios from "axios";

const Profile = ({accessToken}) => {
    const [profileImage, setProfileImage] = useState("/assets/myPage/user-profile.png");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    // 프로필 데이터 가져오기 호출
    useEffect(() => {
        fetchUserProfile();
    }, []);

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

// 사용자 정보 가져오기
    const fetchUserProfile = async () => {
        if (!accessToken) {
            console.error("Access token not found. Please log in again.");
            return;
        }

        try {
            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { name, email, picture } = response.data;

            // 상태에 저장
            setProfileImage(picture || "/assets/mypage/user-profile.png");
            setUserName(name || "가나다");
            setUserId(email || "abc@gmail.com");
        } catch (error) {
            console.error("Error fetching user profile:", error.response?.data || error.message);
            setProfileImage("/assets/mypage/user-profile.png");
            setUserName("공공");
            setUserId("@o0_o0_o0");
        }
    };

    return (
        <div className="user-page-info-container">
            <img className="user-profile-img"
                 src={profileImage}
                 alt="user-profile-img"/>
            <div className="user-name-and-id-container">
                <section className="user-name-container">
                    <p className="user-name">{userName}</p>
                    <p className="user-channel-move"
                       onClick={handleChannelView}>
                        @{userId} &#183; 채널 보기</p>
                </section>
                <div className="changes-container">
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