type Action = {
    type: string;
    data?: any;
};

export const posts = (state = { postsData: null }, action: Action) => {
    switch (action.type) {
        case "GET_POSTS":
            return { ...state, postsData: action?.data };
        case "GET_TRENDING_POSTS":
            return { ...state, postsData: action?.data };
        case "GET_USER_POSTS":
            return { ...state, postsData: action?.data };
        case "DELETE_POST":
            return { ...state, postsData: action?.data };
        case "LIKE_POST":
            return { ...state, postsData: action?.data };
        case "CREATE_POST":
            return { ...state, postsData: action?.data };
        case "UPDATE_POST":
            return { ...state, postsData: action?.data };
        case "COMMENT_STUFF":
            return { ...state, postsData: action?.data };
        case "SEARCH_POST":
            return { ...state, postsData: action?.data };
        default:
            return state;
    }
}