const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: `/search`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,
    getMainVideos: `/videos`,
}

export default requests;