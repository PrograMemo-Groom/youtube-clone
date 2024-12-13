/**
 * formatVideoTime
 * - ISO 8601 형식의 YouTube 동영상 지속 시간(duration)을 읽기 쉬운 형식 (HH:MM:SS)으로 변환하는 함수.
 *
 * @param {string} duration - ISO 8601 형식의 지속 시간 문자열 (예: "PT1H2M3S", "PT3M45S")
 * @returns {string} - 변환된 동영상 시간 문자열 (예: "1:02:03", "03:45")
 */
function formatVideoTime(duration) {
    // 정규 표현식을 사용하여 ISO 8601 형식에서 시간(H), 분(M), 초(S) 추출
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    // 시간, 분, 초 추출 (없으면 빈 문자열로 처리)
    const hours = (match[1] || "").replace("H", ""); // "1H" → "1"
    const minutes = (match[2] || "").replace("M", ""); // "2M" → "2"
    const seconds = (match[3] || "").replace("S", ""); // "3S" → "3"

    // 변환된 시간을 HH:MM:SS 형식으로 반환
    // - 시간(hours)이 존재하면 `${hours}:` 형식으로 추가
    // - 분(minutes)은 항상 2자리 숫자로 표시 (padStart 사용)
    // - 초(seconds)는 항상 2자리 숫자로 표시 (padStart 사용)
    return `${hours ? `${hours}:` : ""}${minutes ? minutes.padStart(2, "0") : "00"}:${seconds.padStart(2, "0")}`;
}

export default formatVideoTime;
