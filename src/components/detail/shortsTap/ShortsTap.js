import React from "react";
import "./ShortsTap.css";

function ShortsTap() {
  return (
    <div className='shortsTap-container'>
      <div className='shorts-banner'>
        <img className='shorts-banner-img' src='' alt='���� 이미지' />
        <span>Shorts</span>
      </div>

      <div className='shorts-list'>
        <div className="left-arrow">{"<"}</div>
        <div className="right-arrow">{">"}</div>

        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
            <h3>모동숲 새해 카운트 다운</h3>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>

        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
            <h3>모동숲 새해 카운트 다운</h3>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>
        
        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
            <h3>모동숲 새해 카운트 다운</h3>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>

      </div>
    </div>
  );
}

export default ShortsTap;
