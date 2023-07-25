import { createAction } from "redux-actions";
import { SigninPayload } from "../interfaces/SigninModel"
export const Type = {
  SIGNED_IN: "SIGNED_IN",
};
export const setSigninActions = createAction<SigninPayload>(
  Type.SIGNED_IN
);
