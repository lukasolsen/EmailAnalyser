import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import browseReducer from "./browse/reducer";
import reportReducer from "./report/reducer";

const rootReducer = combineReducers({
  browse: browseReducer,
  report: reportReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
