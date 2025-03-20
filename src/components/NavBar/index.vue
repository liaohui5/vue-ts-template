<template>
  <header class="fixed top-0 w-full h-[50px] items-center bg-white border-b flex py-2 px-4 text-text-regular">
    <div class="logo">
      <img src="/vite.svg" />
    </div>

    <ul class="navs flex-1 inline-flex items-center justify-start">
      <template v-for="link in links">
        <li class="px-4">
          <a href="javascript:void(0)" @click="handleClick(link)" class="text-text-regular hover:text-primary">
            {{ link.name }}
          </a>
        </li>
      </template>
    </ul>

    <div class="inline-flex items-center">
      <div class="mr-2">{{ authUser.nickname }}</div>
      <div class="mr-2 max-w-[30px] rounded-full overflow-hidden">
        <img src="https://raw.githubusercontent.com/liaohui5/images/main/images/202503041407813.jpg" />
      </div>
      <button
        class="px-4 py-1 rounded bg-white border border-danger text-danger hover:text-danger-light-3 hover:cursor-pointer"
        @click="logout"
      >
        退出登录
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from "@/store";
import { storeToRefs } from "pinia";

const store = useAuth();
const { authUser } = storeToRefs(store);
const { logout } = store;

const links = [
  { name: "首页", path: "" },
  { name: "分类", path: "" },
  { name: "我的", path: "" },
];

function handleClick(link: { name: string; path: string }) {
  console.log("clicked:", link);
}
</script>
