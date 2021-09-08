// local store :: user
import localforage from "localforage";
import { USER } from "../../constants/local-forage";

const UserService = {
  getUser() {
    return localforage.getItem(USER);
  },

  saveUser(user) {
    localforage.setItem(USER, user);
  },

  removeUser() {
    localforage.removeItem(USER);
  },
};

export default UserService;
