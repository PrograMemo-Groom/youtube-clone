import React, { useRef, useState } from "react";
import formatViewerCount from "../../../utils/formatViewerCount";
import "./ShortsTap.css";

function ShortsTap() {
  const [shorts, setShorts] = useState([
    {
      id: 1,
      title: "모동숲 새해 카운트 다운",
      viewerCount: 123,
      thumbUrl:
        "https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA",
    },
    {
      id: 2,
      title: "모동숲 새해 카운트 다운",
      viewerCount: 540000,
      thumbUrl:
        "https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA",
    },
    {
      id: 3,
      title: "모동숲 새해 카운트 다운",
      viewerCount: 231,
      thumbUrl:
        "https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA",
    },
    {
      id: 4,
      title: "모동숲 새해 카운트 다운",
      viewerCount: 123,
      thumbUrl:
        "https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA",
    },
    {
      id: 5,
      title: "모동숲 새해 카운트 다운",
      viewerCount: 540000,
      thumbUrl:
        "https://i.ytimg.com/vi/ThJBisdZB1Y/oar2.jpg?sqp=-oaymwEoCJUDENAFSFqQAgHyq4qpAxcIARUAAIhC2AEB4gEKCBgQAhgGOAFAAQ==&rs=AOn4CLDhYHosGr9qX6ZKrtIqDQriUiFHBA",
    },
  ]);
  // 스크롤 이벤트를 위한 Ref
  const categoryBarRef = useRef(null);

  // 스크롤 이벤트
  const handleScroll = (direction) => {
    const scrollContainer = categoryBarRef.current;
    // console.log(scrollContainer);
    const scrollAmount = scrollContainer.clientWidth;
    if (direction === "left") {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right") {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className='shortsTap-container'>
      <div className='shorts-header'>
        <img
          className='shorts-header-img'
          src='https://i.namu.wiki/i/LkKUWu-wSjxhbv9Nc1TeDv7cQVGAm9fb51bMED8S73h0495WomoGvYlS2pbfJAx14IEeHDyMJO85nKL2Q5cs4qgVW458GNv1F3aEghP0Pgb-iDX50RJI_rhRxsOpOCJqWmnEZk-3psmR7uYQu4Kzag.svg'
          alt='쇼츠 아이콘'
        />
        <span>Shorts</span>
      </div>

      <div className='left-arrow' onClick={() => handleScroll("left")}>
          {"<"}
        </div>
        <div className='right-arrow' onClick={() => handleScroll("right")}>
          {">"}
        </div>

      <div className='shorts-list' ref={categoryBarRef}>
        {shorts.map((short, index) => (
          <figure className='shorts-item' key={index}>
            <img
              className='shorts-item-img'
              src={short.thumbUrl}
              alt='미리보기 이미지'
            />
            <div className='shorts-item-info'>
              <span className='title'>{short.title}</span>
              <span className='viewer-count'>
                조회수 {formatViewerCount(short.viewerCount)}
              </span>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default ShortsTap;
