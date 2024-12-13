function formatVideoTime(duration){
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");

    return `${hours ? `${hours}:` : ""}${minutes ? minutes.padStart(2, "0") : "00"}:${seconds.padStart(2, "0")}`;
}
export default formatVideoTime