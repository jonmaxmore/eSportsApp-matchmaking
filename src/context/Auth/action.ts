import { Types } from "./type";
import { Dispatch } from "react";
import { DispatchAuth } from "./interface/context";
import { AuthPayload } from "./interface/auth";

export const signIn =
  (dispatch: Dispatch<DispatchAuth>) =>
  async (payload: AuthPayload[Types.SingIn]) => {
    // console.log('payload', payload)
    const token = {
      accessToken: payload.token.accessToken || "",
      // rtoken: payload.token.rtoken || "",
    };
    const userInfo = payload.userInfo;
    localStorage.setItem("token", token.accessToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch({
      type: Types.SingIn,
      payload: { token, userInfo },
    });
  };

export const onReLoad = (dispatch: Dispatch<DispatchAuth>) => async () => {};

export const signOut = (dispatch: Dispatch<DispatchAuth>) => async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  dispatch({
    type: Types.SingOut,
    payload: {
      token: {
        accessToken: "",
        // rtoken: "",
      },
      userInfo: {
        id: "",
        uuid: "",
        name: "",
        email: "",
        profile_photo: "",
        password: "",
        role: "",
        assessorType: "",
        sport: "",
      },
    },
  });
};
