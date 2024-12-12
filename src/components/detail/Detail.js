import React from "react";
import CreatorReserveTap from "./creatorReserveTap/CreatorReserveTap";
import ShortsTap from "./shortsTap/ShortsTap";
import RelatedVideo from "./relatedVideo/RelatedVideo";
import MainVideo from "./mainVideo/MainVideo";
import "./Detail.css";

function Detail() {
  return (
    <div className="detail-container">
      <div className="main-section">
        <MainVideo />
      </div>
      <div className="side-section">
        <CreatorReserveTap />
        <ShortsTap />
        <RelatedVideo />
      </div>
    </div>
  );
}

export default Detail;
