import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/recipeView",
    name: "recipeView",
    component: () =>
      import(/* webpackChunkName: "editor" */ "../views/recipeView.vue"),
  },
  {
    path: "/pantryView",
    name: "pantryView",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/pantryView.vue"),
  },
  {
    path: "/",
    name: "homeView",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/homeView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
