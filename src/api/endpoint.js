const requests = {
    fetchPopularVideos: `/videos`,
    fetchSearchVideos: `/search`,
    fetchCategoryVideos: (id) => `/videoCategories/${id}`,
    fetchSubscriptions: `/subscriptions`,
}

export default requests;