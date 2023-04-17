const initialState = {
    searchTerm: "",
    searchResults: [],
    recommendResults: [],
    showRecommenderMenu: true,
    showRecommenderResults: false,
    progress: 0,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_SEARCH_TERM":
        return {
          ...state,
          searchTerm: action.payload,
        };
      case "SET_SEARCH_RESULTS":
        return {
          ...state,
          searchResults: action.payload,
        };
      case "SET_RECOMMEND_RESULTS":
        return {
          ...state,
          recommendResults: action.payload,
        };
      case "SET_PROGRESS":
        return {
          ...state,
          progress: action.payload,
        };
      case "SET_SHOW_RECOMMENDER_MENU":
        return {
          ...state,
          showRecommenderMenu: action.payload,
        };
      case "SET_SHOW_RECOMMENDER":
        return {
          ...state,
          showRecommenderResults: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  