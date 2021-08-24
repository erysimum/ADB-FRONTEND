import store from "store";
const USER_TOKEN = "user_token";
export default {
  saveToken(token) {
    store.set(USER_TOKEN, token);
  },

  getToken() {
    return store.get(USER_TOKEN) || {};
  },

  removeToken() {
    store.remove(USER_TOKEN);
  },
};
