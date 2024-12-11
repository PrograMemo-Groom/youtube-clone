import "./MyPage.css";

const videoData = [{
    videoId: "8yEzRxsilu0",
    thumbnail: "https://i.ytimg.com/vi/Gg_J9Eonl4Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAag4fMJqf99yAtvLDQNbu2ZJ94Lw",
    title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
    channel: "김로라",
    view: "7.3만회",
    uploadedAt: "4주 전",
    duration: "3:13:00",
}, {
    videoId: "VkHkoSk2Xos",
    title: "11월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트 | Playlist | Kpop",
    thumbnail: "https://i.ytimg.com/vi/xFwNdsuoseQ/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBIiv2i0UwmAX5ch9qIAWpQ0m-4yA",
    channel: "밤공원",
    view: "6.7만회",
    uploadedAt: "4일 전",
    duration: "2:01:50",
},
    {
        videoId: "3",
        thumbnail: "https://i.ytimg.com/vi/Gg_J9Eonl4Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAag4fMJqf99yAtvLDQNbu2ZJ94Lw",
        title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
        channel: "김로라",
        view: "7.3만회",
        uploadedAt: "4주 전",
        duration: "3:13:00",
    }, {
        videoId: "4",
        title: "11월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트 | Playlist | Kpop",
        thumbnail: "https://i.ytimg.com/vi/xFwNdsuoseQ/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBIiv2i0UwmAX5ch9qIAWpQ0m-4yA",
        channel: "밤공원",
        view: "6.7만회",
        uploadedAt: "4일 전",
        duration: "2:01:50",
    },
    {
        videoId: "5",
        thumbnail: "https://i.ytimg.com/vi/Gg_J9Eonl4Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&amp;rs=AOn4CLAag4fMJqf99yAtvLDQNbu2ZJ94Lw",
        title: "[KPOP Playlist] 요즘 듣는 케이팝 노동요 플레이리스트]",
        channel: "김로라",
        view: "7.3만회",
        uploadedAt: "4주 전",
        duration: "3:13:00",
    },
    {
        videoId: "6",
        title: "11월 케이팝 여자아이돌 걸그룹 노래모음 (가사포함) | 플레이리스트 | Playlist | Kpop",
        thumbnail: "https://i.ytimg.com/vi/xFwNdsuoseQ/hqdefault.jpg?s…BACGAY4AUAB&rs=AOn4CLBIiv2i0UwmAX5ch9qIAWpQ0m-4yA",
        channel: "밤공원",
        view: "6.7만회",
        uploadedAt: "4일 전",
        duration: "2:01:50",
    },
]


// const thumbnailUrl = (videoId) => {
//     return `https://i.ytim.com/vi/${videoId}/mqdefault.jpg`;
// }

// videoId를 map으로 돌려서 썸네일 Url 추가
// const updatethumbnailUrl = videoData.map((video) => ({
//     ...video,
//     // thumbnail: thumbnailUrl(video.videoId), // 썸네일 URL 생성
//     thumbnail: `https://i.ytim.com/vi/${video.videoId}/mqdefault.jpg`,
// }))
//
// console.log(updatethumbnailUrl);

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
                <section className="view-record-contents-container">
                    <section className="video-list">
                        {/*{videoData.map((video) => (*/}
                        {videoData.map((video, i) => (
                            <section className="video-item" key={`${i}-${video.videoId}`}>
                                {/*<div className="video-thumbnail-container">*/}
                                {/*    <section className="video-item" key={video.videoId}>*/}
                                <div className="video-thumbnail-container">
                                    <img
                                        className="video-thumbnail"
                                        src={video.thumbnail}
                                        alt={video.title}
                                    />
                                </div>
                                <div className="video-info-container">
                                    <h3 className="video-title">{video.title}</h3>
                                    <p className="video-channel">{video.channel}</p>
                                    <p className="video-meta">
                                        {video.view} · {video.uploadedAt}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </section>

                    {/*<section className="video-list">*/}
                    {/*    {videoData.map((video) => (*/}
                    {/*        <section className="video-item" key={video.videoId}>*/}
                    {/*            <img*/}
                    {/*                className="video-thumbnail"*/}
                    {/*                // src={thumbnailUrl(video.videoId)}*/}
                    {/*                src={video.thumbnail}*/}
                    {/*                alt={video.title}*/}
                    {/*            />*/}
                    {/*            <div className="video-info">*/}
                    {/*                <h3 className="video-title">{video.title}</h3>*/}
                    {/*                <p className="video-channel">{video.channel}</p>*/}
                    {/*                <p className="video-meta">*/}
                    {/*                    {video.view} · {video.uploadedAt}*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        </section>*/}
                    {/*    ))}*/}
                    {/*</section>*/}
                </section>

            </div>
        </div>
    )
}