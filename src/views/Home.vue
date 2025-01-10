<template>
  <div>
    <h2>首页</h2>
    <p>用户名: {{ authUser.nickname }}</p>
    <img :src="authUser.avatar_url" />
    <button @click="handleLogout" class="btn btn-primary text-white">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useGoto } from "@/hooks";
import { useAuth } from "@/store";
import { storeToRefs } from "pinia";

const store = useAuth();
const { authUser } = storeToRefs(store);

function handleLogout() {
  store.logout();
  useGoto().redirectToLogin();
}
</script>
