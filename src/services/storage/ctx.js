// local store :: token *may need to shift to cookies.
import localforage from "localforage";
import { CONFIG, SPONSOR, FOLLOWING } from "../../constants/local-forage";

const ctxx = {
  async getConfig() {
    const config = await localforage.getItem(CONFIG);
    return config;
  },

  async getSponsors() {
    const sponsor = await localforage.getItem(SPONSOR);
    return sponsor;
  },

  async getFollowing() {
    const following = await localforage.getItem(FOLLOWING);
    return following;
  },

  async saveConfig(config) {
    await localforage.setItem(CONFIG, config);
  },

  async saveSponsor(sponsor) {
    await localforage.setItem(SPONSOR, sponsor);
  },

  async saveFollowing(following) {
    await localforage.setItem(FOLLOWING, following);
  },

  async removeConfig() {
    await localforage.removeItem(CONFIG);
  },

  async removeSponsors() {
    await localforage.removeItem(SPONSOR);
  },

  async removeFollowing() {
    await localforage.removeItem(FOLLOWING);
  },
};

export default ctxx;
