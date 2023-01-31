import { Types } from "../type";

export interface Token {
  accessToken: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  profile_photo: string;
  role: string;
  [key: string]: any;
}
export interface InitialState {
  auth: boolean;
  token: Token;
  userInfo: UserInfo;
}

export type AuthPayload = {
  [Types.SingIn]: {
    token: Token;
    userInfo: UserInfo;
  };
  [Types.OnReLoad]: null | undefined;
  [Types.SingOut]: { token: Token };
  [Types.RefreshTokens]: { token: Token };
};
