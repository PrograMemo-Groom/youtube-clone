import React from 'react'
import "./CreatorReserveTap.css";

function CreatorReserveTap() {
  return (
    <section className='creator-reserve-container'>
        <div className='menu-section'>메뉴섹션
            <img className='left-arrow' src='' alt='왼쪽 화살표'/>
            <div className='menu-list'>메뉴 리스트
                <div className='menu-item'>메뉴1</div>
                <div className='menu-item'>메뉴2</div>
                <div className='menu-item'>메뉴3</div>
                <div className='menu-item'>메뉴4</div>
            </div>
            <img className='right-arrow' src='' alt='오른쪽 화살표'/>
        </div>
        <div className='video-section'>비디오 섹션
            <div className='video-box'>
                <img className='video' src='' alt='영상 썸네일'/>
                <span className='time-stamp'>1:13:41</span>
            </div>
            <div className='video-detail'>
                <div className='video-title'>잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음</div>
                <div className='channel-name'>by. 채널명</div>
                <div className='video-info'>
                    <span className='viewer-count'>조회수 116만회</span>
                    <span className='upload-date'>4년전</span>
                </div>
                <img className='more-btn' src='' alt='영상 더보기'/>
            </div>
        </div>
        
      
    </section>
  )
}

export default CreatorReserveTap
