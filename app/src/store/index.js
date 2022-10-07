import { createStore } from "vuex";
import Axios from "axios";

const apiURL = `${process.env.VUE_APP_BASE_URL}/api`;
const { isAuthenticated, getAccessTokenSilently } = useAuth0(); //finish add this.getAccessTokenSilently(); to define token for bearer
export default createStore({
  state: {
    WaitingToSync: false,
    user: {
      _id: "",
      nickname: "",
      name: "",
      picture: "",
      updated_at: "",
      email: "",
      email_verified: false,
      auth0PasswordResetURL: process.env.VUE_APP_AUTH0RESETURL,
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getWaitingToSync(state) {
      return state.waitingToFinishSyncing;
    },
  },
  mutations: {
    setuser(state, payload) {
      state.user._id = payload._id;
      state.user.nickname = payload.nickname;
      state.user.name = payload.name;
      state.user.picture = payload.picture;
      state.user.updated_at = payload.updated_at;
      state.user.email = payload.email;
      state.user.email_verified = payload.email_verified;
      state.user.dateAdded = payload.dateAdded;
    },
    setWaitingToSync(state) {
      // Used to set a state object to sync
      // Eg. A new page loads and needs to be notified to load new data
      // Use watcher in views to watch for this value and update data as needed
      state.waitingToFinishSyncing =
        !state.waitingToFinishSyncing;
    },
  },
  actions: {
    async performCRUDOperation({ dispatch }, payload) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Axios.post(
        `${apiURL}/${payload.action}/${payload.endpoint}`,
        payload,
        config
      );
      const dataToSync = {
        endpoint: payload.endpoint,
        data: payload.data,
        user: payload.user,
        responseData: response.data,
      };
      dispatch("syncStore", dataToSync);
    },
    pushNotification(payload) {
      //to do: push toast to dom
      console.log(
        `${payload.data.data.endpoint} ${payload.data.status}: ${payload.data.data.message}`
      );
    },
    syncStore({ commit, dispatch }, payload) {
      // Each crud operation recieves a response payload object that defines endpoint for mutation, 
      // push message information, etc...  Check API for payload object
      if ((payload.responseData.status = "pass")) {
        if (
          payload.endpoint === "createUser" ||
          payload.endpoint === "updateUser"
        ) {
          commit("updateUser", payload.data);
        }
      }
      dispatch("pushNotification", payload.responseData);
    },
  },
  modules: {},
});
