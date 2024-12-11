const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: `/search`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,
    fetchSubscriptions: `/subscriptions`,
    fetchChannelDetails: `/channels`,
    fetchChannelVideos: (channelId) => `/search?channelId=${channelId}&order=date`,
}

export default requests;