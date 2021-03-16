import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "../views/Auth.vue";

const routes = [{ path: "/", component: Auth }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
