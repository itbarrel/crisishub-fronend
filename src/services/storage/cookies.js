// auth :: tokens :: cookies.
// need to set the attributes for the cookies
import Cookie from "js-cookie";
import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_TYPE,
  TOKEN_EXPIRES_IN,
  COOKIE,
  USER_SESSION_ID,
} from "../../constants/local-forage";

const TokenService = {
  acceptCookies() {
    Cookie.set(COOKIE, true);
  },

  isCookiesAccepted() {
    return Cookie.get(COOKIE);
  },

  getToken() {
    return Cookie.get(TOKEN_KEY);
  },

  saveToken(accessToken) {
    Cookie.set(TOKEN_KEY, accessToken);
  },

  removeToken() {
    Cookie.remove(TOKEN_KEY);
  },

  async getRefreshToken() {
    return Cookie.get(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    Cookie.set(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    Cookie.remove(REFRESH_TOKEN_KEY);
  },

  saveExpiresIn(expires_in) {
    Cookie.set(TOKEN_EXPIRES_IN, expires_in);
  },

  getExpiresIn() {
    return Cookie.get(TOKEN_EXPIRES_IN);
  },

  removeExpiresIn() {
    return Cookie.get(TOKEN_EXPIRES_IN);
  },

  saveTokenType(token_type) {
    Cookie.set(TOKEN_TYPE, token_type);
  },

  getTokenType() {
    return Cookie.get(TOKEN_TYPE);
  },

  removeTokenType() {
    return Cookie.get(TOKEN_TYPE);
  },

  // session id
  saveSessionId(session_id) {
    Cookie.set(USER_SESSION_ID, session_id);
  },

  getSessionId() {
    return Cookie.get(USER_SESSION_ID);
  },

  removeSessionId() {
    return Cookie.get(USER_SESSION_ID);
  },
};

export default TokenService;
