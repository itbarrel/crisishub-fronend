// local store :: token *may need to shift to cookies.
import localforage from "localforage";
import {
  TOKEN_KEY,
  USER,
  PERMISSIONS
} from "../../constants/local-forage";

const StorageService = {
  async getToken() {
    return await localforage.getItem(TOKEN_KEY);
  },

  async setToken(accessToken) {
    await localforage.setItem(TOKEN_KEY, accessToken);
  },

  async removeToken() {
    await localforage.removeItem(TOKEN_KEY);
  },

  async getUser() {
    return await localforage.getItem(USER);
  },

  async setUser(user) {
    await localforage.setItem(USER, user);
  },

  async removeUser() {
    await localforage.removeItem(USER);
  },

  async getPermissions() {
    return await localforage.getItem(PERMISSIONS);
  },

  async setPermissions(permissions) {
    await localforage.setItem(PERMISSIONS, permissions);
  },

  async removePermission() {
    await localforage.removeItem(PERMISSIONS);
  },

  async get(key) {
    return await localforage.getItem(key);
  },

  async set(key, value) {
    await localforage.setItem(key, value);
  },

  async remove() {
    await localforage.removeItem(key);
  },
};

export default StorageService;

