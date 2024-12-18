import React from 'react';

const DropdownMenu = props => {
    return (
        <div className='dropdownMenu'>
            <ul>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/playlist.svg`}
                        alt='현재 재생목록에 추가'
                        className='menuIcon'
                    />
                    현재 재생목록에 추가
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/clock.svg`}
                        alt='나중에 볼 동영상에 저장'
                        className='menuIcon'
                    />
                    나중에 볼 동영상에 저장
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/bookmark.svg`}
                        alt='재생목록에 저장'
                        className='menuIcon'
                    />
                    재생목록에 저장
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/download.svg`}
                        alt='오프라인 저장'
                        className='menuIcon'
                    />
                    오프라인 저장
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/share.svg`}
                        alt='공유'
                        className='menuIcon'
                    />
                    공유
                </li>
                <hr className='menuDivider'/>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/wrong.svg`}
                        alt='관심 없음'
                        className='menuIcon'
                    />
                    관심 없음
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/no.svg`}
                        alt='채널 추천 안함'
                        className='menuIcon'
                    />
                    채널 추천 안함
                </li>
                <li>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/videoMore/flag.svg`}
                        alt='신고'
                        className='menuIcon'
                    />
                    신고
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;