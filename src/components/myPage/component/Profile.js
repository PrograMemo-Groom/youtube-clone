import "../MyPage.css";
import React from "react";

const Profile = () => {
    return (
        <div className="user-page-info-container">
            <img className="user-profile-img"
                 src={profileImage}
                 alt="user-profile-img"/>
            <div className="user-name-and-id-container">
                <section className="user-name-container">
                    <p className="user-name">공공</p>
                    <p className="user-channel-move"
                       onClick={handleChannelView}
                    >
                        @o0_o0_o0 &#183; 채널 보기</p>
                </section>
                <div className="changes-container">
                    <section className="changes-id-container">
                        <img className="chang-id-icon"
                             src="/assets/mypage/profile-icon.svg"
                             alt="user-pforile-icon"/>
                        <button className="changes-id-text"
                                onClick={handleLogin}>계정 전환
                        </button>
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