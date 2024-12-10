const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: `/search`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`
}

export default requests;