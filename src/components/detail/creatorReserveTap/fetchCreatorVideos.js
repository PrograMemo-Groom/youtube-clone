import { API_URL, API_KEY } from "../../../config/config.js";

export const fetchCreatorVideos = async (channelId, maxResults = 1) => {
    const url = `${API_URL}/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&type=video&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        const videoList = data.items.map((item) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

        console.log(videoList);
        return videoList;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching creator's videos:", error);
      throw new Error(
        "크리에이터의 다른 영상을 불러오는 중 오류가 발생했습니다."
      );
    }
  };