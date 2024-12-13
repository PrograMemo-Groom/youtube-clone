function formatViewCount(viewCount){
    if (viewCount >= 100000000) {
        return `${Math.floor(viewCount / 100000000)}억회`;
    } else if (viewCount >= 1000000) {
        return `${Math.floor(viewCount / 10000)}만회`;
    } else if (viewCount >= 10000) {
        // 1만 단위 이상 (1만부터는 천회 대신 만회로 변경)
        return `${Math.floor(viewCount / 10000)}만회`;
    } else if (viewCount >= 1000) {
        // 1천 단위 이상 (1만 미만은 천회로 표시)
        return `${Math.floor(viewCount / 1000)}천회`;
    }
    // 1천 미만 그대로 반환
    return `${viewCount}회`;
}

export default formatViewCount