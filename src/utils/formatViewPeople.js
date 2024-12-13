/**
 * formatViewCount
 * - 동영상 조회수(viewCount)를 사람이 읽기 쉽게 한글 형식(억회, 만회, 천회)으로 변환하는 함수.
 *
 * @param {number} viewCount - 동영상 조회수 (숫자)
 * @returns {string} - 변환된 조회수 문자열 (예: "1억회", "123만회", "456천회")
 */
function formatViewCount(viewCount) {
    // 조회수가 1억 이상인 경우
    if (viewCount >= 100000000) {
        // 1억 단위로 나누고 정수로 표시 (예: 150000000 → "1억회")
        return `${Math.floor(viewCount / 100000000)}억회`;
    }
    // 조회수가 100만 이상인 경우
    else if (viewCount >= 1000000) {
        // 1만 단위로 나누어 표시 (예: 12345678 → "123만회")
        return `${Math.floor(viewCount / 10000)}만회`;
    }
    // 조회수가 1만 이상인 경우
    else if (viewCount >= 10000) {
        // 1만 단위로 나누어 표시 (예: 20000 → "2만회")
        // 1만부터는 천 단위 대신 만 단위를 표시
        return `${Math.floor(viewCount / 10000)}만회`;
    }
    // 조회수가 1천 이상 1만 미만인 경우
    else if (viewCount >= 1000) {
        // 1천 단위로 나누어 표시 (예: 1500 → "1천회")
        return `${Math.floor(viewCount / 1000)}천회`;
    }
    // 조회수가 1천 미만인 경우 그대로 표시 (예: 500 → "500회")
    return `${viewCount}회`;
}

export default formatViewCount;
