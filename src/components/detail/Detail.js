import React from 'react'
import CreatorReserveTap from './creatorReserveTap/CreatorReserveTap';
import ShortsTap from './shortsTap/ShortsTap';
import RelatedVideo from './relatedVideo/RelatedVideo';
import MainVideo from './mainVideo/MainVideo';

function Detail() {
  return (
    <div>
      <CreatorReserveTap />
      <ShortsTap />
      <RelatedVideo />
      <MainVideo />
    </div>
  )
}

export default Detail
