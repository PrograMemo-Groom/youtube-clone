import React from 'react'
import CreatorReserveTap from './creatorReserveTap/CreatorReserveTap';
import ShortsTap from './shortsTap/ShortsTap';
import RelatedVideo from './relatedVideo/RelatedVideo';

function Detail() {
  return (
    <div>
      <CreatorReserveTap />
      <ShortsTap />
      <RelatedVideo />
    </div>
  )
}

export default Detail
