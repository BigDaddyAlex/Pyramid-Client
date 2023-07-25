import { Action, handleActions } from "redux-actions";
import { SigninModel } from "../interfaces/SigninModel";

import * as SigninActions from "../actions/signinActions";
export type State = {
  readonly signin: boolean;
};
const initialState: State = {
  signin: false
};
export const signInReducer = handleActions<State, SigninModel>(
  {
    [SigninActions.Type.SIGNED_IN]: (
      state: State,
      action: Action<SigninModel>
    ) => {
      return {
        signin: action.payload ? (action.payload as any) : false };
    }
  },
  initialState
);