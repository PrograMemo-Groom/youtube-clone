const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: (keyword) => `/search/${keyword}`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,

    //구독api
    fetchSubscriptions: `/subscriptions`, 
    fetchChannelDetails: `/channels`,
    fetchChannelVideos: (channelId) => `/search?channelId=${channelId}&order=date`,
}

export default requests;