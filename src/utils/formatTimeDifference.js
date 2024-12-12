import React from 'react'

function formatTimeDifference(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
  
    // 경과 시간 계산 (밀리초 단위)
    const differenceInMilliseconds = currentDate - inputDate;
  
    // 단위 변환
    const oneDay = 1000 * 60 * 60 * 24;
    const oneMonth = oneDay * 30; // 평균적으로 한 달을 30일로 계산
    const oneYear = oneDay * 365;
  
    // 년, 월, 일 계산
    const yearsAgo = Math.floor(differenceInMilliseconds / oneYear);
    const monthsAgo = Math.floor(differenceInMilliseconds / oneMonth);
    const daysAgo = Math.floor(differenceInMilliseconds / oneDay);
  
    if (yearsAgo >= 1) {
      return `${yearsAgo}년 전`;
    }
    if (monthsAgo >= 1) {
      return `${monthsAgo}개월 전`;
    }
    return `${daysAgo}일 전`;
  }
  

export default formatTimeDifference
