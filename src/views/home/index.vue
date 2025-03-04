<template>
  <div>
    <h2>首页</h2>
    <p>用户名: {{ authUser.nickname }}</p>
    <img :src="authUser.avatarUrl" />
    <el-button @click="logout" type="primary">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/store";
import { storeToRefs } from "pinia";

const store = useAuth();
const { authUser } = storeToRefs(store);
const { logout } = store;
</script>
