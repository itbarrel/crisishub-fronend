// auth :: tokens :: cookies.
// need to set the attributes for the cookies
import Cookies from "js-cookie";
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
    Cookies.set(COOKIE, true);
  },

  isCookiesAccepted() {
    return Cookies.get(COOKIE);
  },

  getToken() {
    return Cookies.get(TOKEN_KEY);
  },

  saveToken(accessToken) {
    Cookies.set(TOKEN_KEY, accessToken);
  },

  removeToken() {
    Cookies.remove(TOKEN_KEY);
  },

  async getRefreshToken() {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    Cookies.remove(REFRESH_TOKEN_KEY);
  },

  saveExpiresIn(expires_in) {
    Cookies.set(TOKEN_EXPIRES_IN, expires_in);
  },

  getExpiresIn() {
    return Cookies.get(TOKEN_EXPIRES_IN);
  },

  removeExpiresIn() {
    return Cookies.get(TOKEN_EXPIRES_IN);
  },

  saveTokenType(token_type) {
    Cookies.set(TOKEN_TYPE, token_type);
  },

  getTokenType() {
    return Cookies.get(TOKEN_TYPE);
  },

  removeTokenType() {
    return Cookies.get(TOKEN_TYPE);
  },

  // session id
  saveSessionId(session_id) {
    Cookies.set(USER_SESSION_ID, session_id);
  },

  getSessionId() {
    return Cookies.get(USER_SESSION_ID);
  },

  removeSessionId() {
    return Cookies.get(USER_SESSION_ID);
  },
};

export default TokenService;
