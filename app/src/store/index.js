import { createStore } from "vuex";
import Axios from "axios";
const Language = require("../utils/languages");

const apiURL = `${process.env.VUE_APP_BASE_URL}/api`;
export default createStore({
  state: {
    config: {
      debug: true,
      appName: "Appy App",
      appLogo: "#",
      language: Language.languageText[0].views,
    },
    WaitingToSync: false,
    user: {
      token: "",
      _id: "",
      userName: "Random User",
      dateAdded: "",
      firstName: "",
      lastName: "",
      picture: "",
      email: "",
      emailVerified: false,
      isLoggedIn: false,
      language: "en",
    },
  },
  getters: {
    getDebug(state) {
      return state.config.debug;
    },
    getLanguage(state) {
      return state.config.language;
    },
    getLanguageLibrary() {
      return Language.languageText;
    },
    getUser(state) {
      return state.user;
    },
    getUserToken(state) {
      return state.user.token;
    },
    getWaitingToSync(state) {
      return state.waitingToFinishSyncing;
    },
  },
  mutations: {
    setLanguage(state, payload) {
      state.config.language = payload;
    },
    setUser(state, payload) {
      state.user._id = payload.data.user._id;
      state.user.userName = payload.data.user.userName;
      state.user.firstName = payload.data.user.firstName;
      state.user.lastName = payload.data.user.lastName;
      state.user.email = payload.data.user.email;
      state.user.emailVerified = payload.data.user.emailVerified;
      state.user.dateAdded = payload.data.user.dateAdded;
      state.user.isLoggedIn = payload.data.user.isLoggedIn;
    },
    setWaitingToSync(state) {
      // Used to set a state object to sync
      // Eg. A new page loads and needs to be notified to load new data
      // Use watcher in views to watch for this value and update data as needed
      state.waitingToFinishSyncing = !state.waitingToFinishSyncing;
    },
  },
  actions: {
    // ################################################################
    // # Change Language
    // ################################################################
    async changeLanguage({ commit, dispatch, getters }, payload) {
      let selectedLanguage = Language.languageText.find(
        (code) => code.id === payload
      );
      if (getters.getDebug) {
        console.log("changeLanguage.payload: ", payload);
        console.log("changeLanguage.selectedLanguage: ", selectedLanguage);
      }
      if (payload) {
        commit("setLanguage", selectedLanguage.views);
      } else {
        const errorData = {
          fileName: "app/src/store/index.js",
          methodName: "changeLanguage",
          errorMessage: "Error changing language. Language may not exist.",
        };
        dispatch("logError", errorData);
      }
    },
    // ################################################################
    // # Log Error
    // ################################################################
    logError({ getters, state }, errorData) {
      // to do, implement logging system
      const config = {
        headers: { Authorization: `Bearer ${state.user.token}` },
      };
      const payload = {
        action: "logging",
        endpoint: "addLog",
        data: {
          logData: errorData,
        },
      };
      if (getters.getDebug) {
        console.log("errorData: ", errorData);
        console.log("payload: ", payload);
      }
      try {
        // Axios.post(
        //   `${apiURL}/${payload.action}/${payload.endpoint}`,
        //   payload,
        //   config
        // );
        let consoleMessage = {
          file: "store/index.js",
          function: "logError",
          position: "2",
          message: { payload, config },
        };
        console.log("consoleMessage: ", consoleMessage);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    // ################################################################
    // # Perform Crud Operation
    // ################################################################
    async performCRUDOperation({ dispatch, getters, state }, payload) {
      let shouldRoute = false;
      if (getters.getDebug) {
        console.log("performCRUDOperation.payload: ", payload);
      }
      const config = {
        headers: { Authorization: `Bearer ${state.user.token}` },
      };
      try {
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
        if (
          response.data.status === "pass" &&
          (payload.endpoint === "login" || payload.endpoint === "createUser")
        ) {
          shouldRoute = true;
        }
        return shouldRoute;
      } catch (error) {
        const errorData = {
          fileName: "app/src/store/index.js",
          methodName: "performCRUDOperation",
          errorMessage: error,
        };
        dispatch("logError", errorData);
      }
    },
    // ################################################################
    // # Push Notification
    // ################################################################
    pushNotification({ getters }, payload) {
      if (getters.getDebug) {
        console.log("pushNotification.payload: ", payload);
      }
      //to do: push toast to dom
      console.log(
        `endpoint: ${payload.endpoint} | status: ${payload.status} | message: ${payload.message}`
      );
    },
    // ################################################################
    // # Send To Console
    // ################################################################
    sendToConsole(payload) {
      //payload.file = origination file
      //payload.function = function name
      //payload.position = self-defined position in function calling this method
      //payload.message = message to send to console log
      console.log("file: ", payload.file);
      console.log("function: ", payload.function);
      console.log("position: ", payload.position);
      console.log("message: ", payload.message);
    },
    // ################################################################
    // # Sync Store
    // ################################################################
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
          if (getters.getDebug) {
            console.log("Syncstore: Branching createUser or updateUser");
          }
          payload.responseData.data.user.isLoggedIn = true;
          commit("setUser", payload.responseData);
        }
        if (payload.endpoint === "login") {
          if (getters.getDebug) {
            console.log("Syncstore: Branching login");
          }
          payload.responseData.data.user.isLoggedIn = true;
          let consoleMessage = {
            file: "store/index.js",
            function: "syncStore",
            position: "1",
            message: payload,
          };
          dispatch("sendToConsole", consoleMessage);
          commit("setUser", payload.responseData);
        }
      }
      dispatch("pushNotification", payload.responseData);
    },
  },
  modules: {},
});
