import { getUserID, getToken, getName, getEmail, getProfilePhoto } from '../../Token';
import { InitialState, Token, UserInfo } from "./interface/auth";

function _localStorageGetItem<T>(key: string, initialValue: T) {
  const value = localStorage.getItem(key);

  try {
    if (!value) {
      throw Error();
    }
    return JSON.parse(value);
  } catch (ex) {
    return initialValue; // or do some other error handling
  }
}


const localStorageToken: Token = _localStorageGetItem<Token>("token", {
  accessToken: "",
});

const localStorageUserInfo: UserInfo = _localStorageGetItem<UserInfo>(
  "userInfo",
  {
    id: getUserID() || "",
    uuid: "",
    name: getName() || "",
    email: getEmail() || "",
    profile_photo: getProfilePhoto() || "",
    role: "",
  }
);

export const initialValue: InitialState = {
  auth: !!localStorageToken.accessToken,
  token: localStorageToken,
  userInfo: localStorageUserInfo,
};
