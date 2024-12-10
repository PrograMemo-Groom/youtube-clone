import React from 'react'
import "./CreatorReserveTap.css";

function CreatorReserveTap() {
  return (
    <section className='creator-reserve-container'>
        <div className='menu-section'>
            <span className='left-arrow'>{'<'}</span>
            <div className='menu-list'>
                <div className='menu-item'>모두</div>
                <div className='menu-item'>시리즈</div>
                <div className='menu-item'>blue rain 제공</div>
                <div className='menu-item'>관련 콘텐츠</div>
                <div className='menu-item'>메뉴3</div>
                <div className='menu-item'>메뉴4</div>
            </div>
            <span className='right-arrow'>{'>'}</span>
        </div>
        <div className='video-section'>
            <div className='video-box'>
                <span className='video'></span>
                <span className='time-stamp'>1:13:41</span>
            </div>
            <div className='video-details'>
                <div className='video-title'>잠잘 때, 작업할 때 듣기좋은 시간대별 BGM 모음</div>
                <div className='channel-name'>by. 채널명</div>
                <div className='video-info'>
                    <span className='viewer-count'>조회수 116만회</span>
                    <span className='upload-date'> 4년전</span>
                </div>
                <img className='more-btn' src='assets/icon/more_btn.svg' alt='영상 더보기'/>
            </div>
        </div>
        
      
    </section>
  )
}

export default CreatorReserveTap
