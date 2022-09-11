import { createStore } from "vuex";

const apiURL = `${process.env.VUE_APP_BASE_URL}/api`;

export default createStore({
  state: {
    recipes: {
      _id: "",
      owner: "",
      dateAdded: "",
      recipes: [
        {
          ingredients: {
            ingredient: "",
            volume: 0,
            volumeType: "",
          },
          notes: "",
          owner: "",
          imgLink: "",
          log: {
            amountSold: {
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
      pantry: [
        {
          ingedient: "",
          volume: 0,
          purchaseHistory: {
            volume: 0,
            cost: 0,
            purchaseDate: "",
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
  getters: {},
  mutations: {
    setRecipes(state, payload) {
      state._id = payload._id;
      state.owner = payload.owner;
      state.dateAdded = payload.dateAdded;
      state.recipes = payload.recipes;
    },
    setPantry(state, payload) {
      state._id = payload._id;
      state.owner = payload.owner;
      state.dateAdded = payload.dateAdded;
      state.pantry = payload.pantry;
    },
    setuser(state, payload) {
      state._id = payload._id;
      state.nickname = payload.nickname;
      state.name = payload.name;
      state.picture = payload.picture;
      state.updated_at = payload.updated_at;
      state.email = payload.email;
      state.email_verified = payload.email_verified;
      state.dateAdded = payload.dateAdded;
    },
  },
  actions: {},
  modules: {},
});
