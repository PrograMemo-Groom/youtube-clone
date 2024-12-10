import "./MyPage.css";

export default function MyPage() {
    console.log("MyPage is rendering!");
    return (
        <div className="contents-container">
            <div className="user-page-info-container">
                <img className="user-profile-img"
                     src="/assets/mypage/user-profile.png"
                     alt="user-profile-img"/>
                <div className="user-name-and-id-container">
                    <section className="user-name-container">
                        <p className="user-name">공공</p>
                        <a href="https://www.naver.com/" className="user-channel-move">@o0_o0_o0 &#183; 채널 보기</a>
                    </section>
                    <div>
                        <section className="changes-id-container">
                            <img className="chang-id-icon"
                                 src="/assets/mypage/profile-icon.svg"
                                 alt="user-pforile-icon"/>
                            <p className="changes-id-text">계정 전환</p>
                        </section>
                        <div className="Google-id-change-container">
                        <section className="Google-id-container">
                            <img className="chang-id-icon"
                                 src="/assets/mypage/google-logo-icon.svg"
                                 alt="google-id"/>
                            <p className="changes-id-text">Google 계정</p>
                        </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}