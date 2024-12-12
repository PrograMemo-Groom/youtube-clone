const requests = {
    // main page
    getMainVideos: `/videos`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,
    fetchChannelDetails: `/channels`,
  
    // demo
    fetchPopularVideos: `/videos`,
  
    // search
    fetchSearchVideos: `/search`, 
  
    // subscriptions
    fetchSubscriptions: `/subscriptions`,

    // playlists
    fetchplaylistsVideos: `/playlists`,
  
    // mypage
    fetchChannelVideos: (channelId) => `/search?channelId=${channelId}&order=date`,
}

export default requests;