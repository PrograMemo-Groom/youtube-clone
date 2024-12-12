 // 숫자로 들어온 조회수 데이터를 1만 단위로 표시 함수
 function formatViewerCount(count) {
  if (count < 1000) {
    return `${count}`; // 1,000 미만은 그대로 표시
  }
  if (count < 10000) {
    const formattedCount = Math.floor(count / 1000); // 1,000 단위로 나누고 내림
    return `${formattedCount}천`;
  }
  const formattedCount = (count / 10000).toFixed(0); // 10,000 단위로 나누고 소수점 1자리까지 표시
  return `${formattedCount}만`;
}


export default formatViewerCount
