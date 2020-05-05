import { combineReducers } from "redux";
import { messageBoardReducer } from "./messageBoard";

export default combineReducers({
  messageBoard: messageBoardReducer,
});
