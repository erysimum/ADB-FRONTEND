// import storageUtils from "../../utils/storageUtils";
import { UserActionTypes } from "../actions/user.types";

const INITIAL_STATE = {
  currentUser: { username: null },
  // token: storageUtils.getToken(),
  token: "",
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case UserActionTypes.RESET_USER:
      return INITIAL_STATE;

    default:
      return state;
  }
};