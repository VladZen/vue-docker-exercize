import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inventory List",
    component: () => import(/* webpackChunkName: "list" */ "@/views/List.vue"),
  },
  {
    path: "/show/:id",
    name: "View Item",
    component: () => import(/* webpackChunkName: "view" */ "@/views/View.vue"),
  },
  {
    path: "/edit/:id",
    name: "Edit Item",
    component: () => import(/* webpackChunkName: "view" */ "@/views/Edit.vue"),
  },
  {
    path: "/create",
    name: "New Item",
    component: () => import(/* webpackChunkName: "view" */ "@/views/New.vue"),
  },
  // default
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
