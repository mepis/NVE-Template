import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "homeView",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/homeView.vue"),
  },
  {
    path: "/login",
    name: "loginView",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/loginView.vue"),
  },
  {
    path: "/register",
    name: "registerView",
    component: () =>
      import(/* webpackChunkName: "projects" */ "../views/registerView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
