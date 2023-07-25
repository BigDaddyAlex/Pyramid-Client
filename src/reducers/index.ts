import { routerReducer as router, RouterState } from "react-router-redux";
import { combineReducers } from "redux";
import { signInReducer, State as SigninState } from "./signinReducer";

interface StoreEnhancerState {}
export interface RootState extends StoreEnhancerState {
  router: RouterState;
  signinReducer: SigninState;
}
export const rootReducer = combineReducers<RootState>({
  router,
  signinReducer: signInReducer as any
});

