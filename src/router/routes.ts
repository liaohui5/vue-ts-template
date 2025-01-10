import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

export enum RouteNames {
  Login = "login",
  Home = "home",
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.Home,
    component: Home,
    meta: {
      useLayout: true,
    },
  },
  {
    path: "/login",
    name: RouteNames.Login,
    component: Login,
    meta: {
      isPublic: true,
    },
  },
];
