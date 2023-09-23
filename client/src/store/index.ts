import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reportReducer from "./reports/reducer";

const rootReducer = combineReducers({
  reports: reportReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
