// getChannelSubscriberCount.js
import {API_KEY, API_URL} from "../config/config";

// 채널 ID를 받아서 구독자 수를 리턴하는 함수
export const getChannelSubscriberCount = async (channelId) => {
  const url = `${API_URL}/channels?part=statistics&id=${channelId}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // console.log("data!!@#!@#!@#", data);

    // 채널 정보가 정상적으로 반환되었는지 확인
    if (data.items && data.items.length > 0) {
      const subscriberCount = data.items[0].statistics.subscriberCount;
      return subscriberCount; // 구독자 수 리턴
    } else {
      throw new Error("채널 정보를 가져올 수 없습니다.");
    }
  } catch (error) {
    console.error("에러 발생:", error);
    return null; // 오류 발생 시 null 리턴
  }
};
