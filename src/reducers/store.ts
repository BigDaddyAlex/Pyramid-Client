import { createBrowserHistory } from "history";

import { routerMiddleware as createRouterMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { RootState, rootReducer } from "./index";
export const history = createBrowserHistory();
export const routerMiddleware = createRouterMiddleware(history);
export function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [routerMiddleware];
  // compose enhancers
  const enhancer = compose(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}