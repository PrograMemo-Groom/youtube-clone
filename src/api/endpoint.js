const requests = {

    // common
    fetchGetVideo: `/videos`,
    fetchGetChannel: `/channels`,
    fetchGetSearch: `/search`,

    // main page
    getMainVideos: `/videos`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,
    fetchChannelDetails: `/channels`,
  
    // demo
    fetchPopularVideos: `/videos`,
  
    // subscriptions
    fetchSubscriptions: `/subscriptions`,
  
    // mypage
    fetchChannelVideos: (channelId) => `/search?channelId=${channelId}&order=date`,
}

export default requests;