// this stores the seached movie
export const setSearchTerm = (term) => ({
  type: "SET_SEARCH_TERM",
  payload: term,
});

// this stores the search results
export const setSearchResults = (results) => ({
  type: "SET_SEARCH_RESULTS",
  payload: results,
});

//this stores recommender menu visibility
export const setShowRecommenderMenu = (showRecommenderMenu) => ({
  type: "SET_SHOW_RECOMMENDER_MENU",
  payload: showRecommenderMenu,
});
// this stores the recommended movies
export const setRecommendResults = (results) => ({
  type: "SET_RECOMMEND_RESULTS",
  payload: results,
});

//LoadingBar.js
export const setProgress = (progress) => ({
  type: "SET_PROGRESS",
  payload: progress,
});

//show recommender or show search results
export const setShowRecommenderResult = (showRecommenderResult) => ({
  type: "SET_SHOW_RECOMMENDER",
  payload: showRecommenderResult,
});