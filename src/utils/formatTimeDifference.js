import React from 'react'

function formatTimeDifference(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
  
    // 경과 시간 계산 (밀리초 단위)
    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    // 단위 변환
    const oneMinute = 60;
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30;
    const oneYear = oneDay * 365;
  
    // 년, 월, 일 계산
    const yearsAgo = Math.floor(differenceInSeconds / oneYear);
    const monthsAgo = Math.floor(differenceInSeconds / oneMonth);
    const daysAgo = Math.floor(differenceInSeconds / oneDay);
    const hoursAgo = Math.floor(differenceInSeconds / oneHour);

    if (yearsAgo >= 1) {
        return `${yearsAgo}년 전`;
    }
    if (monthsAgo >= 1) {
        return `${monthsAgo}개월 전`;
    }
    if (daysAgo >= 1) {
        return `${daysAgo}일 전`;
    }
    return `${hoursAgo}시간 전`;
  }
  

export default formatTimeDifference
