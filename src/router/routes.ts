import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/Home/index.vue";
import Login from "@/views/Login/index.vue";

export enum RouteNames {
  Login = "login",
  Home = "home",
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.Home,
    component: Home,
  },
  {
    path: "/login",
    name: RouteNames.Login,
    component: Login,
    meta: {
      isPublic: true,
      withoutLayout: true,
    },
  },
];
