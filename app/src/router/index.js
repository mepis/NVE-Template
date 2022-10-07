import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
