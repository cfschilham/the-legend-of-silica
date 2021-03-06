import Vue from "vue";
import VueRouter from "vue-router";
import Start from "../views/Start.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Start",
    component: Start,
    meta: { title: "Start - The Legend of Silica" },
  },
  {
    path: "/campaign/:name",
    name: "Campaign",
    component: () => import(/* webpackChunkName: "game" */ "../views/Campaign/Campaign.vue"),
    meta: { title: "Campaign - The Legend of Silica" },
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
    meta: { title: "Menu - The Legend of Silica" },
  },
  {
    path: "/newcampaign",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/NewCampaign"),
    meta: { title: "New campaign - The Legend of Silica" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || "The Legend of Silica";
  });
});

export default router;