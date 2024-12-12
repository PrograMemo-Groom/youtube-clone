const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: `/search`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,
    getMainVideos: `/videos`,
    fetchChannelDetails: `/channels`,
}

export default requests;