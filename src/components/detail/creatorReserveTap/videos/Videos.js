import React from 'react';
import formatViewerCount from "../../../../utils/formatViewerCount";
import DropdownMenu from "../../../dropdownMenu/DropdownMenu";

const Videos = ({channelId, video, handleShowVideo, toggleDropdown, openDropdown}) => {
    const handleChannelClick = (channelId, event) => {
        if (event) event.stopPropagation(); // 이벤트 버블링 방지
        window.open(`https://www.youtube.com/channel/${channelId}`, "_blank");
    };

    return (video && video.length > 0 ? (video.map((video, index) => (<div className='video-section' key={index}>
        <div
            onClick={(event) => handleShowVideo(video.id, event)}
            className='video-box'>
            <img src={video.videoSrc} alt='썸네일' className='video'></img>
            <span className='time-stamp'>{video.timestamp}</span>
        </div>
        <div className='video-details'>
            <div className={`video-title`}>{video.title}</div>
            <div
                onClick={(event) => handleChannelClick(channelId, event)}
                className='channel-name'
            >
                {video.channelName}
            </div>
            <div className='video-info'>
                <span className='viewer-count'>
                  {formatViewerCount(video.viewerCount)}•{video.uploadDate}
                </span>
            </div>
            <img
                className='more-btn'
                src='assets/icon/more_btn_black.svg'
                alt='영상 더보기'
                onClick={() => toggleDropdown(video.id)}
            />
            {openDropdown === video.id && (<DropdownMenu/>)}
        </div>
    </div>))) : (<div>비디오가 없습니다.</div>));


};

export default Videos;