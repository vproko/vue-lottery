import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

import Home from "../components/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "AdminPages" */ "../components/Admin.vue"),
    redirect: "/admin/session",
    children: [
      {
        path: "session",
        name: "Session",
        component: () =>
          import(/* webpackChunkName: "AdminPages" */ "../components/Session.vue"),
      },
      {
        path: "draw",
        name: "Draw",
        component: () =>
          import(/* webpackChunkName: "AdminPages" */ "../components/Draw.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () =>
          import(/* webpackChunkName: "AdminPages" */ "../components/Users.vue"),
      },
      {
        path: "prizes",
        name: "Prizes",
        component: () =>
          import(/* webpackChunkName: "AdminPages" */ "../components/Prizes.vue"),
      },
      {
        path: "create-admin",
        name: "CreateAdmin",
        component: () =>
          import(/* webpackChunkName: "AdminPages" */ "../components/CreateAdmin.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      if (store.getters.loginStatus && store.getters.adminStatus) next();
      else next({ name: from.name });
    },
  },
  {
    path: "/ticket",
    name: "Ticket",
    component: () =>
      import(/* webpackChunkName: "UserPages" */ "../components/Ticket.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.loginStatus) next();
      else next({ name: from.name });
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "SharedPages" */ "../components/Profile.vue"),
    beforeEnter: (to, from, next) => {
      if (store.getters.loginStatus) next();
      else next({ name: from.name });
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "SharedPages" */ "../components/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "SharedPages" */ "../components/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
