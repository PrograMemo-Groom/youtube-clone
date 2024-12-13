import { API_KEY, API_URL } from "../config/config";

// Shorts 영상 리스트를 반환하는 함수
export const fetchShortsVideos = async (keyword = "Shorts", maxResults = 10) => {
  const url = `${API_URL}/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(
    keyword
  )}&type=video&videoDuration=short&key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      return data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`, // 영상 링크 추가
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("YouTube Shorts 데이터를 가져오는 중 오류가 발생했습니다:", error);
    throw new Error("YouTube Shorts 데이터를 가져오는 중 문제가 발생했습니다.");
  }
};

export default fetchShortsVideos;
