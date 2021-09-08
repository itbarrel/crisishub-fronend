import localforage from "localforage";
import { FCM_TOKEN_KEY } from "../../constants/local-forage";

const FCMTokenService = {
  getToken() {
    return localforage.getItem(FCM_TOKEN_KEY);
  },

  saveToken(fcmToken) {
    localforage.setItem(FCM_TOKEN_KEY, fcmToken);
  },

  removeToken() {
    localforage.removeItem(FCM_TOKEN_KEY);
  },
};

export default FCMTokenService;
