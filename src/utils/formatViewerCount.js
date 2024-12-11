 // 숫자로 들어온 조회수 데이터를 1만 단위로 표시 함수
function formatViewerCount(count) {
    if (count < 10000) {
        return `${count}회`; // 1만 미만은 그대로 표시
      }
      const formattedCount = (count / 10000).toFixed(); // 1만 단위로 나누고 소수점 1자리까지 표시
      return `${formattedCount}만회`;
}

export default formatViewerCount
