import Vue from "vue";
import VueRouter from "vue-router";
import Start from "../views/Menu/Menu.vue";

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "game" */ "../views/Campaign/Campaign.vue"),
    meta: { title: "Campaign - The Legend of Silica" },
  },
  {
    path: "/campaign",
    name: "Campaign",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "game" */ "../views/Campaign/Campaign.vue"),
    meta: { title: "Game - The Legend of Silica" },
  },
  {
    path: "/newcampaign",
    name: "NewCampaign",
    component: () => import(/* webpackChunkName: "newcampaign" */ "../views/NewCampaign.vue"),
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
