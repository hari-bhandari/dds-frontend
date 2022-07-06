import {AUTH} from "../defines";

export default (state, action) => {
  switch (action.type) {
    case AUTH.LOG_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action?.payload?.token
      }
    case AUTH.LOG_IN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload
      }
    case AUTH.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case AUTH.LOAD_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state;
  }
};
