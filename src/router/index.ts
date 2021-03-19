import { createRouter, createWebHashHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Index from "../views/Index.vue";
import test from "../views/test.vue";
import NewArticle from "../views/NewArticle.vue";

const routes = [
  { path: "/", component: Auth }, 
  { path: "/index", component: Index },
  { path: "/test", component: test },
  { path: "/newArticle", component: NewArticle },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
