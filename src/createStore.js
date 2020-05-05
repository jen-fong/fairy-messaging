import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

export default function createAppStore() {
  const store = createStore(rootReducer, composeWithDevTools());

  return store;
}
