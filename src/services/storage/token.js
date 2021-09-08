// local store :: token *may need to shift to cookies.
import localforage from "localforage";
import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  COOKIE,
} from "../../constants/local-forage";

const TokenService = {
  getToken() {
    return localforage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localforage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localforage.removeItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localforage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    localforage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    localforage.removeItem(REFRESH_TOKEN_KEY);
  },

  acceptCookies() {
    localforage.setItem(COOKIE, true);
  },

  isCookiesAccepted() {
    return localforage.getItem(COOKIE);
  },
};

export default TokenService;

// Note:
// We have three styles of set/get items
// 1. callback form
// 2. promise form
// 3. async/await

// * can make multiple instances of the local store. ;)

// Resource:
// https://github.com/localForage/localForage
