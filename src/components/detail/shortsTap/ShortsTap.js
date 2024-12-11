import React from "react";
import "./ShortsTap.css";

function ShortsTap() {
  return (
    <div className='shortsTap-container'>
      <div className='shorts-header'>
        <img className='shorts-header-img' src='https://i.namu.wiki/i/LkKUWu-wSjxhbv9Nc1TeDv7cQVGAm9fb51bMED8S73h0495WomoGvYlS2pbfJAx14IEeHDyMJO85nKL2Q5cs4qgVW458GNv1F3aEghP0Pgb-iDX50RJI_rhRxsOpOCJqWmnEZk-3psmR7uYQu4Kzag.svg' alt='���� 이미지' />
        <span>Shorts</span>
      </div>

      <div className='shorts-list'>
        {/* <div className="left-arrow">{"<"}</div>
        <div className="right-arrow">{">"}</div> */}

        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
          <span className="title">모동숲 새해 카운트 다운</span>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>

        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
            <span className="title">모동숲 새해 카운트 다운</span>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>
        
        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
          <span className="title">모동숲 새해 카운트 다운</span>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>

        <figure className='shorts-item'>
          <img className='shorts-item-img' src='https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA' alt='미리보기 이미지' />
          <div className='shorts-item-info'>
          <span className="title">모동숲 새해 카운트 다운</span>
            <span className="viewer-count">조회수 54만회</span>
          </div>
        </figure>

      </div>
    </div>
  );
}

export default ShortsTap;
