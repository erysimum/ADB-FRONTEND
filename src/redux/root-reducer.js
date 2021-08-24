import { combineReducers } from "redux";
import { candidateReducer } from "./reducers/candidate";
import { jobReducer } from "./reducers/job";
import { userReducer } from "./reducers/user";
import { eventReducer } from "./reducers/event";

const rootReducer = combineReducers({
  user: userReducer,
  candidate: candidateReducer,
  job: jobReducer,
  event: eventReducer
});

export default rootReducer;
