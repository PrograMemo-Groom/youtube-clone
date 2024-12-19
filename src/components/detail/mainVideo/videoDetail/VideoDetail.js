import React, {useState} from 'react';
import formatViewerCount from "../../../../utils/formatViewerCount";
import DropdownMenu from "../../../dropdownMenu/DropdownMenu";
import formatTimeDifference from "../../../../utils/formatTimeDifference";
import {useDispatch, useSelector} from "react-redux";
import {setToggleSubscribe} from "../../../../store/actions/DetailActions";

const VideoDetail = ({setMenuTheme}) => {
    const {channelId, videoData, content, subscriptions} = useSelector((state) => state.detail);
    const dispatch = useDispatch();

    const videoId = videoData.id;

    // const [isSubscribe, setIsSubscribe] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false); // 더보기 메뉴
    const [showFullText, setShowFullText] = useState(false);

    const toggleDropdown = (videoId) => {
        setOpenDropdown((prev) => (prev === videoId ? null : videoId));
    };

    const handleChannelClick = (channelId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        window.open(`https://www.youtube.com/channel/${channelId}`, "_blank");
    };

    const handleToggleText = () => {
        setShowFullText((prevState) => !prevState);
    };

    // 텍스트를 단락 단위로 나누고, 첫 5단락만 표시
    const getTextWithLimitedLines = (text) => {
        if (!text) {
            return "";
        }

        const paragraphs = text.split("\n"); // 단락을 나누기
        if (paragraphs.length > 5) {
            const visibleText = paragraphs.slice(0, 5).join("\n"); // 첫 5단락만 표시
            return `${visibleText}\n...`;
        }
        return text;
    };

    const handleSubscribeToggle = () => {
        dispatch(setToggleSubscribe(videoId)); // 구독 상태 토글
    }


    return <figure className='video-details'>
        <div className='details-header'>{content.title}</div>
        <div className='details-actions'>
            <div className='creator-tab'>
                <img
                    onClick={(event) => handleChannelClick(channelId, event)} // 유저 프로필 클릭 이벤트 추가
                    src={content.channelImgUrl}
                    alt='creator'
                />
                <div className='creator-info'>
                    <span>{content.channel}</span>
                    <span>
                구독자 {formatViewerCount(content.channelSubscribers)}명
              </span>
                </div>
                {subscriptions[videoId] ?
                    (<button onClick={handleSubscribeToggle} style={setMenuTheme}
                             className='subscribe-btn subscribe'>
                        구독 중
                    </button>)
                    :
                    (<button onClick={handleSubscribeToggle} style={setMenuTheme}
                             className='subscribe-btn'>구독</button>)}


            </div>

            <div className='actions'>
                <div>
                    <button style={setMenuTheme} className='like-btn'>
                        👍좋아요 {formatViewerCount(content.likes)}
                    </button>
                    <button style={setMenuTheme} className='hate-btn'>
                        👎
                    </button>
                </div>
                <button style={setMenuTheme} className='share-btn'>
                    ⤴️ 공유
                </button>
                <button style={setMenuTheme} className='saveOfline-btn'>
                    ⬇️ 오프라인 저장
                </button>
                <button style={setMenuTheme} className='Thanks-btn'>
                    {" "}
                    Thanks
                </button>
                <button
                    style={setMenuTheme}
                    onClick={() => toggleDropdown(videoId)}
                    className='more-btn'
                >
                    ···
                </button>
                {openDropdown === videoData.id && (<DropdownMenu/>)}
            </div>
        </div>
        <div style={setMenuTheme} className='details-contents'>
            <p>
                조회수 {formatViewerCount(content.views)}회{" "}
                {formatTimeDifference(content.uploadDate)}
            </p>
            <span dangerouslySetInnerHTML={{
                __html: showFullText ? content.text : getTextWithLimitedLines(content.text)
            }}>

          </span>
            {content.text.split("\n").length > 5 && (<span className='more-text-btn' onClick={handleToggleText}>
              {showFullText ? "...간략히" : "...더보기"}
            </span>)}
        </div>
    </figure>

};


export default VideoDetail;