import { createStore } from "vuex";
import Axios from "axios";

const apiURL = `${process.env.VUE_APP_BASE_URL}/api`;

export default createStore({
  state: {
    recipes: {
      _id: "",
      owner: "",
      dateAdded: "",
      waitingToFinishSyncing: false,
      recipes: [
        {
          name: "",
          isActive: false,
          ingredients: {
            ingredient: "",
            volume: 0,
            volumeType: "",
          },
          notes: "",
          owner: "",
          imgLink: "",
          log: {
            entry: {
              date: "",
              quantity: 0,
            },
          },
        },
      ],
    },
    pantry: {
      _id: "",
      owner: "",
      dateAdded: "",
      waitingToFinishSyncing: false,
      pantry: [
        {
          ingedient: "",
          data: {
            volume: 0,
            volumeType: "",
            purchaseHistory: {
              cost: 0,
              purchaseDate: "",
            },
          },
        },
      ],
    },
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
    getRecipes(state) {
      return state.recipes;
    },
    getPantry(state) {
      return state.pantry;
    },
    getUser(state) {
      return state.user;
    },
    getPantryWaitingToSync(state) {
      return state.pantry.waitingToFinishSyncing;
    },
    getRecipesWaitingToSync(state) {
      return state.recipes.waitingToFinishSyncing;
    },
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes._id = payload._id;
      state.recipes.owner = payload.owner;
      state.recipes.dateAdded = payload.dateAdded;
      state.recipes.recipes = payload.recipes;
    },
    setPantry(state, payload) {
      state.pantry._id = payload._id;
      state.pantry.owner = payload.owner;
      state.pantry.dateAdded = payload.dateAdded;
      state.pantry.pantry = payload.pantry;
    },
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
    setPantryWaitingToSync(state) {
      state.pantry.waitingToFinishSyncing = !state.pantry.waitingToFinishSyncing;
    },
    setRecipeWaitingToSync(state) {
      state.recipes.waitingToFinishSyncing = !state.recipes.waitingToFinishSyncing;
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
      if ((payload.responseData.status = "pass")) {
        if (
          payload.endpoint === "createRecipe" ||
          payload.endpoint === "updateRecipe" ||
          payload.endpoint === "readRecipes"
        ) {
          commit("setRecipes", payload.data);
        }
        if (
          payload.endpoint === "createPantry" ||
          payload.endpoint === "updatePantry" ||
          payload.endpoint === "readPantry"
        ) {
          commit("setPantry", payload.data);
          commit("setPantryWaitingToSync");
        }
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
