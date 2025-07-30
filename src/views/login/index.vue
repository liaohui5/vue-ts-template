<template>
  <div class="w-screen h-screen overflow-hidden flex items-center justify-center">
    <el-card class="w-96">
      <template #header>
        <div class="text-center">
          <h2 class="text-lg">登录</h2>
        </div>
      </template>

      <div>
        <div>
          <el-input v-model="loginForm.account" placeholder="请输入邮箱" size="large" />
          <p v-show="validateErrors.account" class="text-error text-sm">{{ validateErrors.account }}</p>
        </div>

        <div class="pt-4">
          <el-input v-model="loginForm.password" size="large" type="password" placeholder="请输入密码" />
          <p v-show="validateErrors.password" class="text-error text-sm">{{ validateErrors.password }}</p>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-center">
          <el-button size="large" @click="resetLoginForm" type="danger">重 置</el-button>
          <el-button size="large" @click="submitLoginForm" type="primary">登 录</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs, useAuth } from "@/store";

const store = useAuth();
const { loginForm, validateErrors } = storeToRefs(store);
const { resetLoginForm, submitLoginForm } = store;
</script>
