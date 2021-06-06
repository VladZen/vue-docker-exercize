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
    props: {
      action: "show",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "view" */ "@/views/View.vue"),
  },
  {
    path: "/edit/:id",
    name: "Edit Item",
    props: {
      action: "edit",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "view" */ "@/views/View.vue"),
  },
  {
    path: "/new",
    name: "New Item",
    props: {
      action: "create",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "view" */ "@/views/View.vue"),
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

export default router;
