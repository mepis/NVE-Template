import { createStore } from "vuex";
import Axios from "axios";

const apiURL = `${process.env.VUE_APP_BASE_URL}/api`;
export default createStore({
  state: {
    config: {
      debug: true,
      appName: "Default Name",
      appLogo: "#",
    },
    WaitingToSync: false,
    user: {
      token: "",
      _id: "",
      userName: "",
      dateAdded: "",
      firstName: "",
      lastName: "",
      picture: "",
      email: "",
      emailVerified: false,
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getWaitingToSync(state) {
      return state.waitingToFinishSyncing;
    },
    getUserToken(state) {
      return state.user.token;
    },
    getDebug(state) {
      return state.config.debug;
    },
  },
  mutations: {
    setuser(state, payload) {
      state.user._id = payload.data.user._id;
      state.user.userName = payload.data.user.userName;
      state.user.firstName = payload.data.user.firstName;
      state.user.lastName = payload.data.user.lastName;
      state.user.email = payload.data.user.email;
      state.user.emailVerified = payload.data.user.emailVerified;
      state.user.dateAdded = payload.data.user.dateAdded;
    },
    setWaitingToSync(state) {
      // Used to set a state object to sync
      // Eg. A new page loads and needs to be notified to load new data
      // Use watcher in views to watch for this value and update data as needed
      state.waitingToFinishSyncing = !state.waitingToFinishSyncing;
    },
  },
  actions: {
    async performCRUDOperation({ dispatch, getters, state }, payload) {
      if (getters.getDebug) {
        console.log("performCRUDOperation.payload: ", payload);
      }
      const config = {
        headers: { Authorization: `Bearer ${state.user.token}` },
      };
      const response = await Axios.post(
        `${apiURL}/${payload.action}/${payload.endpoint}`,
        payload,
        config
      );
      if (getters.getDebug) {
        console.log("performCRUDOperation.response: ", response);
      }
      const dataToSync = {
        endpoint: payload.endpoint,
        data: payload.data,
        user: payload.user,
        responseData: response.data,
      };
      dispatch("syncStore", dataToSync);
    },
    pushNotification({ getters }, payload) {
      if (getters.getDebug) {
        console.log("pushNotification.payload: ", payload);
      }
      //to do: push toast to dom
      console.log(
        `endpoint: ${payload.endpoint} | status: ${payload.status} | message: ${payload.message}`
      );
    },
    syncStore({ commit, dispatch, getters }, payload) {
      // Each crud operation recieves a response payload object that defines endpoint for mutation,
      // push message information, etc...  Check API for payload object
      if (getters.getDebug) {
        console.log("syncStore.payload: ", payload);
      }
      if (payload.responseData.status === "pass") {
        if (
          payload.endpoint === "createUser" ||
          payload.endpoint === "updateUser"
        ) {
          commit("setuser", payload.responseData);
        }
      }
      dispatch("pushNotification", payload.responseData);
    },
  },
  modules: {},
});
