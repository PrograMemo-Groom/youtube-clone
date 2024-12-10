const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: (keyword) => `/search/${keyword}`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`
}

export default requests;