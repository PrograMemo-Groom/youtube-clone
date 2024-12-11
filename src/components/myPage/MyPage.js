import "./MyPage.css";

const videoData = [{
    videoId: "8yEzRxsilu0",
    title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
    channel: "김로라",
    view: "7.3만회",
    uploadedAt: "4주 전",
    duration: "3:13:00",
}, {
    videoId: "VkHkoSk2Xos",
    title: "12월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트",
    channel: "밤공원",
    view: "6.7만회",
    uploadedAt: "4일 전",
    duration: "2:01:50",
}]

const thumbnailUrl = (videoId) => {
    return `https://i.ytim.com/vi/${videoId}/mqdefault.jpg`;
}

// videoId를 map으로 돌려서 썸네일 Url 추가
const updatethumbnailUrl = videoData.map((video) => ({
    ...video,
    thumbnail: thumbnailUrl(video.videoId), // 썸네일 URL 생성
}))

console.log(updatethumbnailUrl);

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
                    <div className="changes-container">
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
            <div className="view-record-container">
                <section className="view-record-text-btn">
                    <p>기록</p>
                    <button>모두 보기</button>
                </section>
            </div>
        </div>
    )
}