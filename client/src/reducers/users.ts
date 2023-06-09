type Action = {
  type: string;
  data?: any;
};

export const user = (state = { authData: null }, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return localStorage.setItem("token", JSON.stringify(action?.data));
    case "GET_USER_BY_ID":
      return { ...state, authData: action?.data };
    case "LOGOUT":
      return localStorage.removeItem("token");
    default:
      return state;
  }
};
